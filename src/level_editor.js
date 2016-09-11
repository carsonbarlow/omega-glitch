// manages the level editor

var LevelEditor = function(){

  var game_master,
    input,
    dom_manager;

  var direction_map = {
    n: 1,
    ne: 2,
    e: 3,
    se: 4,
    s: 5,
    sw: 6,
    w: 7,
    nw: 8
  },
  path_directions = ['n','ne','e','se','s','sw','w','nw'];


  var level = {
    charges: 0,
    spots: {},
    paths: [],
    patrols: [],
    patrol_generators: [],
    start: false,
    objectives: [],
    gates: [],
    gate_generators: []
  };

  var x = 0,
    y = 0,
    space_stats,
    current_path = [],
    path_incomlete = false,
    spot_id_tracker = 0;

  function inject_game_master(_game_master_){
    game_master = _game_master_;
  }

  function inject_input(_input_){
    input = _input_;
    input.add_subscriber(this);
  }

  function inject_dom_manager(_dom_manager_){
    dom_manager = _dom_manager_;
    dom_manager.enable_paths([]);
  }

  function button_pressed(button){
    if (button.substring(0,5) == 'grid_'){
      if (path_incomlete){return;}
      x = parseInt(button.split('_')[1]);
      y = parseInt(button.split('_')[2]);
      dom_manager.select_grid_square(x,y);
      refresh_level();
    }else if(button == 'add_spot'){
      add_spot();
    }else if(button == 'add_objective'){
      add_objective();
    }else if(button == 'add_charge'){
      add_charge();
    }else if(button.substring(0,5) == 'path_'){
      make_path(direction_map[button.split('_')[1]]);
    }else if (button == 'export'){
      dom_manager.export_level(level);
    }else if (button == 'test_level'){
      dom_manager.close_screen('level_editor');
      dom_manager.open_screen('game_background');
      dom_manager.open_screen('play_game');
      game_master.set_up_custom_level(level, true);
    }else{
      return;
    }
  }

  function refresh_level(){
    load_level();
    space_stats = survay_space();
    toggle_buttons();
  }

  function survay_space(){
    response = {}
    for (var s in level.spots){
      if (level.spots[s].x == x && level.spots[s].y == y){
        response.spot = level.spots[s];
        response.spot_name = s;
        // join_path_to_spot(level.spots[s]);
        current_path = [];
        for (var o = 0; o < level.objectives.length; o++){
          if (level.objectives[o][0] == s){
            response.objective = level.objectives[o];
            dom_manager.build_objective_config(response.objective, level.paths);
          }
        }
      }
    }
    // console.log(response);
    return response;
  }

  function toggle_buttons(){
    if (!!space_stats.spot){
      var path_directions = ['n','e','s','w'];
      for (var i = path_directions.length -1; i >= 0; i--){
        if (typeof space_stats.spot[path_directions[i]] != 'undefined'){
          path_directions.splice(i,1);
        }
      }
      dom_manager.enable_paths(path_directions);
      if (!!space_stats.objective || !!space_stats.spot.charge){
        dom_manager.enable_buttons([]);
      }else{
        dom_manager.enable_buttons(['objective','charge']);
      }
    }else if (path_incomlete){
      var path_directions = ['n','ne','e','se','s','sw','w','nw'];
      var current_direction = current_path[current_path.length - 2] - 1;
      current_direction = (current_direction + 4)%8;
      path_directions.splice(current_direction,1);
      dom_manager.enable_paths(path_directions);
      dom_manager.enable_buttons(['spot']);
    }else{
      dom_manager.enable_paths([]);
      dom_manager.enable_buttons(['spot']);
    }
  }

  function add_spot(){
    spot_id_tracker++;
    var spot = {x:x,y:y};
    level.spots['s'+spot_id_tracker] = spot;
    if (!level.start){
      level.start = 's'+spot_id_tracker;
    }
    if(current_path.length){
      join_path_to_spot(spot);
    }
    path_incomlete = false;
    refresh_level();
    
  }

  function add_objective(){
    var objective = [space_stats.spot_name,[]];
    level.objectives.push(objective);
    // dom_manager.build_objective_config(objective, level.paths);
    refresh_level();
  }

  function add_charge(){
    space_stats.spot.charge = true;
    refresh_level();
  }

  function make_path(direction){
    if (!current_path.length){
      current_path.push(space_stats.spot_name, direction, 1);
      level.paths.push(current_path);
      space_stats.spot[path_directions[direction-1]] = level.paths.length -1;
    }else{
      if (current_path[current_path.length-2] == direction){
        current_path[current_path.length-1]++;
      }else{
        current_path.push(direction, 1);
      }
    }
    x += CONFIG.direction_to_grid_difference[direction].x;
    y += CONFIG.direction_to_grid_difference[direction].y;
    dom_manager.select_grid_square(x,y);
    path_incomlete = true;
    refresh_level();
  }

  function join_path_to_spot(spot){
    var path_direction_numbers = [1,3,5,7];
    var index = path_direction_numbers.indexOf(current_path[current_path.length-2]);
    var origin_spot = level.spots[current_path[0]];
    var direction = path_directions[current_path[1]-1];
    origin_spot[direction] = ['s'+spot_id_tracker, level.paths.length -1];
    if (index > -1){
      index = ((index + 2)%4);
      spot[path_directions[path_direction_numbers[index]-1]] = [current_path[0],level.paths.length -1];
    }
    path_incomlete = false;
  }

  function path_checkbox_changed(checkbox){
    var path_index = parseInt(checkbox.value);
    var list = space_stats.objective[1];
    if (checkbox.checked){
      list.push(path_index);
    }else{
      list.splice(list.indexOf(path_index),1);
    }
  }

  function load_level(){
    if (!Object.keys(level.spots).length){return;}
    level.charges = parseInt(dom_manager.get_charge_count()) || 0;
    game_master.set_up_custom_level(level);
  }

  this.inject_game_master = inject_game_master;
  this.inject_input = inject_input;
  this.inject_dom_manager = inject_dom_manager;
  this.key_pressed = function(){};
  this.button_pressed = button_pressed;
  this.path_checkbox_changed = path_checkbox_changed;


  this.get_level = function(){
    return level;
  }

}
