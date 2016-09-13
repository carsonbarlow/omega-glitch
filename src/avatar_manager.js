// manages avatar states and actions
var AvatarManager = function(){

  var DIRECTION = {
    a:'west',
    s:'south',
    d:'east',
    w:'north'
  }

  var avatar = {
    pos_x: 0,
    pos_y: 0,
    vol_x: 0,
    vol_y: 0,
    speed: 500,
    charges: 0,
    collision: 10,
    radius: 10,

    graphic: {
      lineWidth: 0,
      fillStyle: 'rgba(12,20,31,0.7)',
      strokeStyle: '#29c8df',
      shadowColor: '#39b5a6',
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    }
  };

  var input,
  level_manager,
  path,
  checkpoint;
  var moving = false,
    gate_hit = false,
  current_spot;



  function do_charge(){
    if (avatar.charges){
      avatar.charges--;
      // TODO: graphic explosion
      level_manager.detonate_charge(current_spot);
    }
  }


  function set_avatar_volocity(){
    var vol = utils.normalize(avatar.pos_x, avatar.pos_y, path[checkpoint].x, path[checkpoint].y);
    avatar.vol_x = vol[0] * avatar.speed;
    avatar.vol_y = vol[1] * avatar.speed;
  }

  function move_avatar(delta){
    if (!moving){return;}
    avatar.pos_x += (avatar.vol_x*delta);
    avatar.pos_y += (avatar.vol_y*delta);
    if (avatar.vol_x > 0 && avatar.pos_x > path[checkpoint].x){
      go_to_checkpoint();
      return;
    }else if (avatar.vol_x < 0 && avatar.pos_x < path[checkpoint].x){
      go_to_checkpoint();
      return;
    }
    if (path[checkpoint] && avatar.vol_y > 0 && avatar.pos_y > path[checkpoint].y){
      go_to_checkpoint();
    }else if (avatar.vol_y < 0 && avatar.pos_y < path[checkpoint].y){
      go_to_checkpoint();
    }


    function go_to_checkpoint(){
      avatar.pos_x = path[checkpoint].x;
      avatar.pos_y = path[checkpoint].y;
      checkpoint++
      if (checkpoint >= path.length){
        jump_to_spot(next_spot);
      }else{
        set_avatar_volocity();
      }
    }

  }

  function jump_to_spot(spot){
    current_spot = spot;
    moving = false;
    avatar.pos_x = spot.pos_x;
    avatar.pos_y = spot.pos_y;
    if (spot.charge){
      avatar.charges++;
      spot.charge = false;
    }
    avatar.collision = 8;
    gate_hit = false;
  }

  function start_level(){
    jump_to_spot(level_manager.starting_spot);
  }

  function update(delta){
    move_avatar(delta);
  }

  function get_avatar(){
    return avatar;
  };

  function get_gate_hit(){
    return gate_hit;
  }

  function inject_input(_input_){
    input = _input_;
    input.add_subscriber(this)
  }

  function key_pressed(key){
    if (!moving && level_ready){
      if (key === ' '){
        do_charge();
        return;
      }
      var move_leads_to = level_manager.move_leads_to(current_spot, DIRECTION[key]);
      if (move_leads_to){
        path = move_leads_to.path.checkpoints.slice(0);
        if (path[0].x !== avatar.pos_x || path[0].y !== avatar.pos_y){
          path.reverse();
        }
        checkpoint = 1;
        next_spot = move_leads_to.spot;
        set_avatar_volocity();
        moving = true;
        gate_hit = false;
        avatar.collision = 4;
      }
    }
  }

  function inject_level_manager(_level_manager_){
    level_manager = _level_manager_;
  }

  function set_avatar_charges(num){
    avatar.charges = num;
  }

  function hit_gate(){
    gate_hit = true;
    // avatar.vol_x = avatar.vol_x * -1;
    // avatar.vol_y = avatar.vol_y * -1;
    path.reverse();
    checkpoint = (path.length - 1) - checkpoint;
    set_avatar_volocity();
    next_spot = current_spot;
  }

  this.update = update;
  this.get_avatar = get_avatar;
  this.start_level = start_level;
  this.inject_input = inject_input;
  this.key_pressed = key_pressed;
  this.button_pressed = function(){};
  this.inject_level_manager = inject_level_manager;
  this.set_avatar_charges = set_avatar_charges;
  this.get_gate_hit = get_gate_hit;
  this.hit_gate = hit_gate;

};
