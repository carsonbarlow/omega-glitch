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
  };


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
    spot_id_tracker = 0
    path_directions = ['n','ne','e','se','s','sw','w','nw'];

  function inject_game_master(_game_master_){
    game_master = _game_master_;
  }

  function inject_input(_input_){
    input = _input_;
    input.add_subscriber(this);
  }

  function inject_dom_manager(_dom_manager_){
    dom_manager = _dom_manager_;
  }

  function button_pressed(button){
    if (button.substring(0,5) == 'grid_'){
      if (path_incomlete){return;}
      x = parseInt(button.split('_')[1]);
      y = parseInt(button.split('_')[2]);
      dom_manager.select_grid_square(x,y);
    }else if(button == 'add_spot'){
      add_spot();
    }else if(button.substring(0,5) == 'path_'){
      make_path(direction_map[button.split('_')[1]]);
    }else{
      return;
    }
    update_ui();
  }

  function update_ui(){
    space_stats = survay_space();
    toggle_buttons();
  }

  function survay_space(){
    response = {}
    for (var s in level.spots){
      if (level.spots[s].x == x && level.spots[s].y == y){
        response.spot = level.spots[s];
        response.spot_name = s;
        join_path_to_spot(level.spots[s]);
        current_path = [];
      }
    }
    // console.log(response);
    return response;
  }

  function toggle_buttons(){
    if (space_stats.spot){
      var path_directions = ['n','e','s','w'];
      for (var i = path_directions.length -1; i >= 0; i--){
        if (typeof space_stats.spot[path_directions[i]] != 'undefined'){
          path_directions.splice(i,1);
        }
      }
      dom_manager.enable_paths(path_directions);
    }else if (path_incomlete){
      var path_directions = ['n','ne','e','se','s','sw','w','nw'];
      var current_direction = current_path[current_path.length - 2] - 1;
      current_direction = (current_direction + 4)%8;
      path_directions.splice(current_direction,1);
      dom_manager.enable_paths(path_directions);
    }else{
      dom_manager.enable_paths([]);
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
    
    load_level();
    update_ui();

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
    load_level();
    update_ui();
    path_incomlete = false;
    if (!space_stats.spot){
      path_incomlete = true;
    }
    
  }

  function join_path_to_spot(spot){
    var path_direction_numbers = [1,3,5,7];
    var index = path_direction_numbers.indexOf(current_path[current_path.length-2]);
    if (index > -1){
      index = ((index + 2)%4);
      spot[path_directions[path_direction_numbers[index]-1]] = level.paths.length -1;
    }
    path_incomlete = false;
  }

  function load_level(){
    level.charges = parseInt(dom_manager.get_charge_count()) || 0;
    game_master.set_up_custom_level(level);
  }

  this.inject_game_master = inject_game_master;
  this.inject_input = inject_input;
  this.inject_dom_manager = inject_dom_manager;
  this.key_pressed = function(){};
  this.button_pressed = button_pressed;


  this.get_level = function(){
    return level;
  }

}
