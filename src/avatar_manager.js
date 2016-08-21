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
    charges: 0
  };

  var input,
  level_manager;
  var moving = false,
  speed = 3,
  current_spot;


  function move_avatar(delta){
    if (!moving){return;}
    avatar.pos_x += speed;
  }

  function jump_to_spot(spot){
    current_spot = spot;
    avatar.pos_x = spot.x * CONFIG.grid_size;
    avatar.pos_y = spot.y * CONFIG.grid_size;
  }

  function start_level(){
    moving = false;
    jump_to_spot(level_manager.starting_spot);
  }

  function update(delta){
    move_avatar(delta);
  }

  function get_avatar(){
    return avatar;
  };

  function inject_input(_input_){
    input = _input_;
    input.add_subscriber(this)
  }

  function key_pressed(key){
    // console.log('AvatarManager: ' + key);
    if (!moving){
      var move_leads_to = level_manager.move_leads_to(current_spot, DIRECTION[key]);
      if (move_leads_to){
        jump_to_spot(move_leads_to);
      }
    }
  }

  function inject_level_manager(_level_manager_){
    level_manager = _level_manager_;
  }

  this.update = update;
  this.get_avatar = get_avatar;
  this.start_level = start_level;
  this.inject_input = inject_input;
  this.key_pressed = key_pressed;
  this.inject_level_manager = inject_level_manager;

};
