// interfaces with the dom

var DomManager = function(){
  var screens = {
    start_screen: document.getElementById('start_screen'),
    select_level: document.getElementById('select_level'),
    game_complete: document.getElementById('game_complete'),
    custom_level: document.getElementById('custom_level'),
    level_editor: document.getElementById('level_editor')
  };
  var play_tip_display = document.getElementById('play_tips');
  var custom_level_textarea = document.getElementById('custom_level_textarea');
  var grid_bg = document.getElementById('grid_bg');
  var grid = document.getElementById('grid');
  var current_grid;

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
          grid_button.id = 'grid_'+w+'_'+h;
          grid_button.classList.add('grid_button');
          grid_button.style.top = ((h * CONFIG.grid_size)+ (CONFIG.grid_size/2)) + 'px' ;
          grid_button.style.left = ((w * CONFIG.grid_size)+ (CONFIG.grid_size/2)) + 'px';
          grid_button.style.width = CONFIG.grid_size + 'px';
          grid_button.style.height = CONFIG.grid_size + 'px';
          grid.appendChild(grid_button);
          input.add_button('grid_'+w+'_'+h);
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

  this.close_screen = close_screen;
  this.open_screen = open_screen;
  this.unlock_levels = unlock_levels;
  this.place_game_tips = place_game_tips;
  this.get_custom_level_input = get_custom_level_input;
  this.select_grid_square = select_grid_square;


};
