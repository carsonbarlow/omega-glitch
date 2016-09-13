// interfaces with the dom

var DomManager = function(){
  var screens = {
    start_screen: document.getElementById('start_screen'),
    select_level: document.getElementById('select_level'),
    play_game: document.getElementById('play_game'),
    game_complete: document.getElementById('game_complete'),
    custom_level: document.getElementById('custom_level'),
    level_editor: document.getElementById('level_editor'),
    export_text: document.getElementById('export_text'),
    game_background: document.getElementById('game_background')
  };
  var play_tip_display = document.getElementById('play_tips');
  var custom_level_textarea = document.getElementById('custom_level_textarea');
  var grid_bg = document.getElementById('grid_bg');
  var grid = document.getElementById('grid');
  var current_grid;
  var path_directions = ['n','ne','e','se','s','sw','w','nw'];
  var level_editor_buttons = ['spot', 'objective','charge','gate_generator','gate','patrol_generator','patrol'];

  var level_editor_patrol_config = document.getElementById('level_editor_patrol_config');

  var button_array_width = 0;
  var button_array_height = 0;
  for (var i = 1; i <= Object.keys(CONTENT.levels).length; i++){
    var level_button = document.createElement('button');
    level_button.textContent = 'lv ' + i;
    level_button.id = 'level_'+i;
    level_button.classList.add('level_btn');
    level_button.classList.add('left_'+button_array_width);
    level_button.classList.add('top_'+button_array_height);
    level_button.disabled = true;
    button_array_width++
    if (button_array_width == CONFIG.level_button_width){
      button_array_width = 0;
      button_array_height++
    }
    screens.select_level.appendChild(level_button);
    input.add_button('level_'+i);
  }

  setup_grid();

  function close_screen(screen){
    // console.log(screen);
    screens[screen].classList.add('hidden');
  }

  function open_screen(screen){
    screens[screen].classList.remove('hidden');
  }

  function unlock_levels(level){
    for (var i = 1; i <= level; i++){
      var level_button = document.getElementById('level_'+i);
      level_button.disabled = false;
    }
  }

  function place_game_tips(play_tips){
    play_tip_display.innerHTML = '';
    for (var i = 0; i < play_tips.length; i++){
      var tip = document.createElement('div');
      tip.classList.add('play_tip');
      tip.style.left = play_tips[i].pos_x + 'px';
      tip.style.top = play_tips[i].pos_y + 'px';
      tip.textContent = play_tips[i].tip_text;
      play_tip_display.appendChild(tip);
    }
  }

  function get_custom_level_input(){
    return custom_level_textarea.value;
  }

  function setup_grid(){
    for (var w = 0; w <= CONFIG.grid_width; w++){
      for (var h = 0; h <= CONFIG.grid_height; h++){
        var grid_square = document.createElement('div');
        grid_square.classList.add('grid_square');
        grid_square.style.top = (h * CONFIG.grid_size) + 'px';
        grid_square.style.left = (w * CONFIG.grid_size) + 'px';
        grid_square.style.width = CONFIG.grid_size + 'px';
        grid_square.style.height = CONFIG.grid_size + 'px';
        grid_bg.appendChild(grid_square);

        if (w < CONFIG.grid_width && h < CONFIG.grid_height){
          var grid_button = document.createElement('div');
          var id = 'grid_'+(w+1)+'_'+(h+1);
          grid_button.id = id
          grid_button.classList.add('grid_button');
          grid_button.style.top = ((h * CONFIG.grid_size)+ (CONFIG.grid_size/2)) + 'px' ;
          grid_button.style.left = ((w * CONFIG.grid_size)+ (CONFIG.grid_size/2)) + 'px';
          grid_button.style.width = CONFIG.grid_size + 'px';
          grid_button.style.height = CONFIG.grid_size + 'px';
          grid.appendChild(grid_button);
          input.add_button(id);
        }
        
      }
    }
  }

  function select_grid_square(x,y){
    if (current_grid){
      current_grid.classList.remove('selected');
    }
    current_grid = document.getElementById('grid_'+x+'_'+y);
    current_grid.classList.add('selected');
  }

  function get_charge_count(){
    return document.getElementById('charge_setter').value;
  }

  function enable_paths(paths){
    for (var i = 0; i < path_directions.length; i++){
      document.getElementById('path_'+path_directions[i]).disabled = (paths.indexOf(path_directions[i]) == -1);
    }
  }

  function enable_gpaths(gpath){
    for (var i = 0; i < path_directions.length; i++){
      document.getElementById('gpath_'+path_directions[i]).disabled = (gpath.indexOf(path_directions[i]) == -1);
    }
  }

  function enable_buttons(buttons){
    // console.log(buttons);
    for (var i = 0; i < level_editor_buttons.length; i++){
      document.getElementById('add_'+level_editor_buttons[i]).disabled = (buttons.indexOf(level_editor_buttons[i])== -1);
    }
  }

  function build_objective_config(objective, paths){
    var editor_context = document.getElementById('level_editor_context_config');
    editor_context.getElementsByTagName('p')[0].innerHTML = "Processor";
    list = editor_context.getElementsByTagName('ul')[0];
    list.innerHTML = '';
    for (var i = 0; i < paths.length; i++){
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = (objective[1].indexOf(i) != -1);
      checkbox.value = i;
      checkbox.addEventListener('change', function(){
        level_editor.path_checkbox_changed(this);
      });
      var li = document.createElement('li');
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode('path_'+i));
      list.appendChild(li);
    }
  }

  function build_patrol_config(patrol, spots){
    level_editor_patrol_config.innerHTML = '';
    var current_spot = spots[patrol[patrol.length-1]];
    var directions = ['n','e','s','w'];
    var direction_space;
    for (var i = 0; i < directions.length; i++){
      if (direction_space = current_spot[directions[i]]){
        if (patrol.length == 1){
          var nav_button = document.createElement('button');
          nav_button.id = 'move_to_'+direction_space[0];
          nav_button.innerHTML = "Move to "+directions[i];
          nav_button.addEventListener('click',function(){
            level_editor.move_patrol_to(this);
          });
          level_editor_patrol_config.appendChild(nav_button);
        }
        var nav_button = document.createElement('button');
        nav_button.id = 'route_to_'+direction_space[0];
        nav_button.innerHTML = "Route to "+directions[i];
        nav_button.addEventListener('click',function(){
          level_editor.add_route_to(this);
        });
        level_editor_patrol_config.appendChild(nav_button);
      }
    }
    if (patrol.length > 1){
      for (i = 0; i < directions.length; i++){
        if (spots[patrol[patrol.length-1]][directions[i]] && spots[patrol[patrol.length-1]][directions[i]][0] == patrol[0]){
          var route_complete = document.createElement('button');
          route_complete.innerHTML = 'Complete Route';
          route_complete.addEventListener('click', function(){
            level_editor.route_complete();
          });
          level_editor_patrol_config.appendChild(route_complete);
        }
      }
    }
  }

  function export_level(level){
    export_text.innerHTML = utils.stringify_level(level);
  }

  this.close_screen = close_screen;
  this.open_screen = open_screen;
  this.unlock_levels = unlock_levels;
  this.place_game_tips = place_game_tips;
  this.get_custom_level_input = get_custom_level_input;
  this.select_grid_square = select_grid_square;
  this.get_charge_count = get_charge_count;
  this.enable_paths = enable_paths;
  this.enable_gpaths = enable_gpaths;
  this.enable_buttons = enable_buttons;
  this.build_objective_config = build_objective_config;
  this.build_patrol_config = build_patrol_config;
  this.export_level = export_level;


};
