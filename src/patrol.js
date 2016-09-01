// manages patrol unit

var Patrol = function(config_route){
  var route = config_route;
  var unit = {
    pos_x: 0,
    pos_y: 0,
    vol_x: 0,
    vol_y: 0,
    speed: 75,
    collision: 10
  };

  var graphics,
    path_list,
    path,
    current_path_index,
    patrol_direction,
    checkpoint,
    moving = true;

  function inject_graphics(_graphics_){
    graphics = _graphics_;
    graphics.add_patrol(unit);
  }

  function make_path_list(paths, spots){
    path_list = [];
    for (var i = 0; i < route.length; i++){
      path_list.push(paths[get_path_to_spot(spots[route[i]], route[((i+1)%route.length)])]); // ((i+1)%route.length) <-- wraps around the array.
    }
    unit.pos_x = spots[route[0]].x * CONFIG.grid_size;
    unit.pos_y = spots[route[0]].y * CONFIG.grid_size;
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
    move(delta);
  }

  function move(delta){
    if (!moving){return;}
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

  }


  function jump_to_next_path(){
    current_path_index = (current_path_index + patrol_direction + route.length)% route.length;
    // console.log(current_path_index);
    path = path_list[current_path_index].checkpoints.slice(0);
    // console.log(path);
    if (path[0].x !== unit.pos_x || path[0].y !== unit.pos_y){
      path.reverse();
    }
    checkpoint = 1;
    set_unit_volocity();
    // console.log(unit);
  }

  function set_unit_volocity(){
    var vol = utils.normalize(unit.pos_x, unit.pos_y, path[checkpoint].x, path[checkpoint].y);
    unit.vol_x = vol[0] * unit.speed;
    unit.vol_y = vol[1] * unit.speed;
  }

  function get_unit(){
    return unit;
  }

  function blow_up(){
    // console.log('patrol: boom mother FUCKA!!');
  };


  this.make_path_list = make_path_list;
  this.update = update;
  this.inject_graphics = inject_graphics;
  this.get_unit = get_unit;
  this.blow_up = blow_up;

}