// manages patrol unit

var Patrol = function(config_route){
  var route = config_route;
  var unit = {
    pos_x: 0,
    pos_y: 0,
    vol_x: 0,
    vol_y: 0,
    speed: 75,
    collision: 10,

    graphic: {
      lineWidth: 0,
      fillStyle: 'rgba(207, 19, 28, 0.8)',
      shadowColor: '#6FC3DF',
      shadowBlur: 20,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    }
  };

  var graphics = injector.get_singleton('graphics'),
    active = true,
    path_list,
    path,
    current_path_index,
    patrol_direction,
    checkpoint,
    starting_x,
    starting_y;

    graphics.add_to_manifest(unit, 'patrols');

  function make_path_list(paths, spots){
    path_list = [];
    for (var i = 0; i < route.length; i++){
      path_list.push(paths[get_path_to_spot(spots[route[i]], route[((i+1)%route.length)])]); // ((i+1)%route.length) <-- wraps around the array.
    }
    unit.pos_x = spots[route[0]].pos_x;
    unit.pos_y = spots[route[0]].pos_y;
    starting_x = unit.pos_x;
    starting_y = unit.pos_y;
    current_path_index = -1;
    patrol_direction = 1;
    jump_to_next_path();
  }

  var directions = ['north','east','west','south'];
  function get_path_to_spot(spot_1, spot_2_name){
    for (var i = 0; i < directions.length; i++){
      if (spot_1[directions[i]] && spot_1[directions[i]][0] == spot_2_name){
        return spot_1[directions[i]][1];
      }
    }
  }

  function update(delta){
    if (!active){return;}
    move(delta);
  }

  function move(delta){
    unit.pos_x += (unit.vol_x*delta);
    unit.pos_y += (unit.vol_y*delta);
    if (unit.vol_x > 0 && unit.pos_x > path[checkpoint].x){
      go_to_checkpoint();
    }else if (unit.vol_x < 0 && unit.pos_x < path[checkpoint].x){
      go_to_checkpoint();
    }
    if (unit.vol_y > 0 && unit.pos_y > path[checkpoint].y){
      go_to_checkpoint();
    }else if (unit.vol_y < 0 && unit.pos_y < path[checkpoint].y){
      go_to_checkpoint();
    }
  }

  function go_to_checkpoint(){
    unit.pos_x = path[checkpoint].x;
    unit.pos_y = path[checkpoint].y;
    checkpoint++
    if (checkpoint >= path.length){
      jump_to_next_path();
    }else{
      set_unit_volocity();
    }
  }

  function jump_to_next_path(){
    if (route.length < 2){return;}
    current_path_index = (current_path_index + patrol_direction + route.length)% route.length;
    path = path_list[current_path_index];
    if (!path && level_editor_mode){
      current_path_index = -1;
      unit.pos_x = starting_x;
      unit.pos_y = starting_y;
      jump_to_next_path();
      return;
    }
    if (path.blown_up){
      patrol_direction = -patrol_direction;
      current_path_index = (current_path_index + (patrol_direction * 2) + route.length)% route.length;
      path = path_list[current_path_index];
    }

    path = path.checkpoints.slice(0);
    if (path[0].x !== unit.pos_x || path[0].y !== unit.pos_y){
      path.reverse();
    }
    checkpoint = 1;
    set_unit_volocity();
  }

  function set_unit_volocity(){
    var vol = utils.normalize(unit.pos_x, unit.pos_y, path[checkpoint].x, path[checkpoint].y);
    unit.vol_x = vol[0] * unit.speed;
    unit.vol_y = vol[1] * unit.speed;
  }

  function get_unit(){
    return unit;
  }

  function is_active(){
    return active;
  }

  function blow_up(){
    active = false;
    unit.graphic.fillStyle = 'rgba(28, 19 207, 0.8)';
    unit.collision = 8;
  };

  function get_current_path(){
    return path_list[current_path_index];
  }

  this.make_path_list = make_path_list;
  this.update = update;
  this.get_unit = get_unit;
  this.get_current_path = get_current_path;
  this.blow_up = blow_up;
  this.is_active = is_active;

}