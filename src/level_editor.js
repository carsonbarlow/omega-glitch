// manages the level editor

var LevelEditor = function(){

  var game_master = injector.get_singleton('game_master'),
    input = injector.get_singleton('input'),
    dom_manager = injector.get_singleton('dom_manager');

  dom_manager.enable_paths([]);
  dom_manager.enable_gpaths([]);
  dom_manager.enable_buttons(['spot']);

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
    gate_generators: [],
    end_of_game:true
  };

  var x = 0,
    y = 0,
    space_stats,
    current_path = [],
    current_gpath = [],
    current_gate_generator,
    current_patrol_generator,
    current_patrol,
    path_incomplete = false,
    gpath_incomplete = false,
    patrol_route_incomplete = false,
    spot_id_tracker = 0;

  input.add_subscriber(this);

  function button_pressed(button){
    if (button.substring(0,5) == 'grid_'){
      if (path_incomplete || gpath_incomplete || patrol_route_incomplete){return;}
      x = parseInt(button.split('_')[1]);
      y = parseInt(button.split('_')[2]);
      dom_manager.select_grid_square(x,y);
    }else if(button == 'add_spot'){
      add_spot();
    }else if(button == 'add_objective'){
      add_objective();
    }else if(button == 'add_charge'){
      add_charge();
    }else if(button == 'add_gate_generator'){
      add_gate_generator();
    }else if(button == 'add_gate'){
      add_gate();
    }else if(button == 'add_patrol_generator'){
      add_patrol_generator();
    }else if(button == 'add_patrol'){
      add_patrol();
    }else if(button.substring(0,5) == 'path_'){
      make_path(direction_map[button.split('_')[1]]);
    }else if(button.substring(0,6) == 'gpath_'){
      make_gpath(direction_map[button.split('_')[1]]);
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
    refresh_level();
  }

  function refresh_level(){
    space_stats = survay_space();
    toggle_buttons();
    load_level();
    
  }

  function survay_space(){
    dom_manager.hide_context();
    response = {}
    for (var s in level.spots){
      if (level.spots[s].x == x && level.spots[s].y == y){
        response.spot = level.spots[s];
        response.spot_name = s;
        if (path_incomplete){
          join_path_to_spot(response.spot);
          current_path = [];
        }
        
        for (var o = 0; o < level.objectives.length; o++){
          if (level.objectives[o][0] == s){
            response.objective = level.objectives[o];
            dom_manager.build_objective_config(response.objective, level.paths);
          }
        }
        for (var gg = 0; gg < level.gate_generators.length; gg++){
          if (level.gate_generators[gg].s == s){
            response.gate_generator = level.gate_generators[gg];
            current_gate_generator = level.gate_generators[gg];
          }
        }
        for (var pg = 0; pg < level.patrol_generators.length; pg++){
          if (level.patrol_generators[pg].s == s){
            response.patrol_generator = level.patrol_generators[pg];
            current_patrol_generator = level.patrol_generators[pg];
          }
        }
      }
    }
    for (var g = 0; g < level.gates.length; g++){
      if (level.gates[g].x == x && level.gates[g].y == y){
        response.gate = level.gates[g];
      }
    }
    return response;
  }

  function toggle_buttons(){
    if (!!space_stats.spot && !gpath_incomplete && !patrol_route_incomplete){
      var path_directions = ['n','e','s','w'];
      for (var i = path_directions.length -1; i >= 0; i--){
        if (typeof space_stats.spot[path_directions[i]] != 'undefined'){
          path_directions.splice(i,1);
        }
      }
      dom_manager.enable_paths(path_directions);
      if (!!space_stats.objective || !!space_stats.spot.charge || !!space_stats.gate_generator || !!space_stats.patrol_generator){
        dom_manager.enable_buttons([]);
        if (!!space_stats.gate_generator){
          dom_manager.enable_gpaths(['n','ne','e','se','s','sw','w','nw']);
        }else if(!!space_stats.patrol_generator){
          dom_manager.enable_buttons('patrol');
        }
      }else{
        dom_manager.enable_buttons(['objective','charge','gate_generator', 'patrol_generator']);
      }
    }else if (path_incomplete){
      var path_directions = ['n','ne','e','se','s','sw','w','nw'];
      var current_direction = current_path[current_path.length - 2] - 1;
      current_direction = (current_direction + 4)%8;
      path_directions.splice(current_direction,1);
      dom_manager.enable_paths(path_directions);
      if (!space_stats.gate){
        dom_manager.enable_buttons(['spot']);
      }else{
        dom_manager.enable_buttons([]);
      }
      dom_manager.enable_gpaths([]);
    }else if(gpath_incomplete){
      var path_directions = ['n','ne','e','se','s','sw','w','nw'];
      var current_direction = current_gpath[current_gpath.length - 2] - 1;
      current_direction = (current_direction + 4)%8;
      path_directions.splice(current_direction,1);
      dom_manager.enable_gpaths(path_directions);
      dom_manager.enable_paths([]);
      if (!space_stats.spot){
        dom_manager.enable_buttons(['gate']);
      }else{
        dom_manager.enable_buttons([]);
      }
    }else if(!space_stats.spot){
      dom_manager.enable_paths([]);
      dom_manager.enable_gpaths([]);
      dom_manager.enable_buttons(['spot']);
    }else{
      dom_manager.enable_paths([]);
      dom_manager.enable_gpaths([]);
      dom_manager.enable_buttons([]);
    }
    for (p = 0; p < level.paths.length; p++){
      if (level.paths[p].slice(0).pop() == 'threat'){
        level.paths[p].pop();
      }
    }
    if (!!space_stats.objective){
      for (var p = 0; p < space_stats.objective[1].length; p++){
        if (level.paths[space_stats.objective[1][p]].slice(0).pop() != 'threat'){
          level.paths[space_stats.objective[1][p]].push('threat');
        }
      }
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
    path_incomplete = false;
    // refresh_level();
    
  }

  function add_objective(){
    var objective = [space_stats.spot_name,[]];
    level.objectives.push(objective);
    // dom_manager.build_objective_config(objective, level.paths);
    // refresh_level();
  }

  function add_charge(){
    space_stats.spot.charge = true;
    // refresh_level();
  }

  function add_gate_generator(){
    var gate_generator = {s: space_stats.spot_name, g:[],gp:[]};
    level.gate_generators.push(gate_generator);
    // refresh_level();
  }

  function add_gate(){
    var gate = {x:x,y:y};
    level.gates.push(gate);
    current_gate_generator.g.push(level.gates.length-1);
    current_gpath = [];
    gpath_incomplete = false;
    // refresh_level();
  }

  function add_patrol_generator(){
    var patrol_generator = {s:space_stats.spot_name,p:[]};
    level.patrol_generators.push(patrol_generator);
    // refresh_level();
  }

  function add_patrol(){
    var patrol = [current_patrol_generator.s];
    current_patrol = patrol;
    level.patrols.push(patrol);
    current_patrol_generator.p.push(level.patrols.length-1);
    patrol_route_incomplete = true;
    // refresh_level();
    dom_manager.build_patrol_config(patrol, level.spots);
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
    path_incomplete = true;
    // refresh_level();
  }

  function make_gpath(direction){
    if (!current_gpath.length){
      current_gate_generator.gp.push(current_gpath);
    }
    if (current_gpath[current_gpath.length-2] == direction){
      current_gpath[current_gpath.length-1]++;
    }else{
      current_gpath.push(direction, 1);
    }
    x += CONFIG.direction_to_grid_difference[direction].x;
    y += CONFIG.direction_to_grid_difference[direction].y;
    dom_manager.select_grid_square(x,y);
    gpath_incomplete = true;
    // refresh_level();
  }

  function join_path_to_spot(spot){
    var path_direction_numbers = [1,3,5,7];
    var index = path_direction_numbers.indexOf(current_path[current_path.length-2]);
    var origin_spot = level.spots[current_path[0]];
    var direction = path_directions[current_path[1]-1];
    for (s in level.spots){
      if (level.spots[s] == spot){
        origin_spot[direction] = [s, level.paths.length -1];
        break;
      }
    }
    if (index > -1){
      index = ((index + 2)%4);
      spot[path_directions[path_direction_numbers[index]-1]] = [current_path[0],level.paths.length -1];
    }
    current_path = [];
    path_incomplete = false;
  }

  function path_checkbox_changed(checkbox){
    var path_index = parseInt(checkbox.value);
    var list = space_stats.objective[1];
    if (checkbox.checked){
      list.push(path_index);
      level.paths[path_index].push('threat');
    }else{
      list.splice(list.indexOf(path_index),1);
      level.paths[path_index].pop();
    }
    refresh_level();
  }

  function move_patrol_to(button){
    var spot_name = button.id.split('_')[2];
    current_patrol[0] = spot_name;
    refresh_level();
    dom_manager.build_patrol_config(current_patrol, level.spots);
  }

  function add_route_to(button){
    var spot_name = button.id.split('_')[2];
    current_patrol.push(spot_name);
    refresh_level();
    dom_manager.build_patrol_config(current_patrol, level.spots);
  }

  function route_complete(){
    current_patrol_generator = false;
    current_patrol = false;
    patrol_route_incomplete = false;
    refresh_level();
  }

  function load_level(){
    if (!Object.keys(level.spots).length){return;}
    level.charges = parseInt(dom_manager.get_charge_count()) || 0;
    game_master = injector.get_singleton('game_master');
    game_master.set_up_custom_level(level);
  }

  this.key_pressed = function(){};
  this.button_pressed = button_pressed;
  this.path_checkbox_changed = path_checkbox_changed;
  this.move_patrol_to = move_patrol_to;
  this.add_route_to = add_route_to;
  this.route_complete = route_complete;


  this.get_level = function(){
    return level;
  }

}
