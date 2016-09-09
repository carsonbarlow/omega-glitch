// mediates game flow
var level_ready = false;

var GameMaster = function(){

  var graphics,
  input,
  dom_manager,
  current_level,
  highest_level = read_in_cookie() || 6,
  avatar_manager = new AvatarManager();
  level_manager = new LevelManager();

  avatar_manager.inject_level_manager(level_manager);
  level_manager.inject_avatar_manager(avatar_manager);
  level_manager.inject_game_master(this);

  function update(delta){
    avatar_manager.update(delta);
    level_manager.update(delta);
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
    graphics.inject_avatar(avatar_manager.get_avatar());
    level_manager.inject_graphics(_graphics_);
  }

  function inject_input(_input_){
    input = _input_;
    avatar_manager.inject_input(_input_);
    input.add_subscriber(this);
  }

  function inject_dom_manager(_dom_manager_){
    dom_manager = _dom_manager_;
  }

  function start_game(){
    current_level = 6;
    start_level();
  };

  function start_level(){
    level_manager.clear_level();
    graphics.clear_level();
    level_manager.setup_level(current_level);
    dom_manager.place_game_tips(level_manager.get_play_tips());
    avatar_manager.start_level();
    level_ready = true;
  }

  function level_complete(){
    setTimeout(function(){
      level_ready = false;
      current_level++
      if (current_level > highest_level){
        highest_level = current_level;
        dom_manager.unlock_levels(highest_level);
        document.cookie = 'omega_glitch_level='+highest_level;
      }
      start_level();
    },1000);
    
  }

  function game_complete(){
    dom_manager.open_screen('game_complete');
  }

  function reset_level(){
    level_ready = false;
    start_level();
  }

  function button_pressed(button){
    if (button == 'campaign'){
      dom_manager.close_screen('start_screen');
      dom_manager.open_screen('select_level');
      dom_manager.unlock_levels(highest_level);
    }else if (button.substring(0,6) == 'level_'){
      current_level = parseInt(button.substring(6));
      start_level();
      dom_manager.close_screen('select_level');
    }else if(button == 'restart_level'){
      level_ready = false;
      start_level();
    }else if(button == 'quit_level'){
      dom_manager.open_screen('select_level');
    }else if(button == 'back_to_start'){
      dom_manager.close_screen('game_complete');
      dom_manager.open_screen('start_screen');
    }
  }

  function read_in_cookie(){
    var cookies = document.cookie;
    cookies = cookies.split(';');
    for (var i = 0; i < cookies.length; i++){
      if (cookies[i].trim().substring(0,19) == 'omega_glitch_level='){
        return parseInt(cookies[i].substring(20));
      }
    }
  }

  this.update = update;
  this.inject_graphics = inject_graphics;
  this.inject_input = inject_input;
  this.inject_dom_manager = inject_dom_manager;
  this.key_pressed = function(){};
  this.button_pressed = button_pressed;
  this.start_game = start_game;
  this.level_complete = level_complete;
  this.reset_level = reset_level;
  this.game_complete = game_complete;

};


