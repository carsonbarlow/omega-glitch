// mediates game flow
var level_ready = false;
var game_paused = false;
var level_editor_mode = true;

var GameMaster = function(){

  var graphics = injector.get_singleton('graphics'),
  input = injector.get_singleton('input'),
  dom_manager = injector.get_singleton('dom_manager'),
  level_editor = injector.get_singleton('level_editor'),
  level_manager = injector.get_singleton('level_manager'),
  avatar_manager = injector.get_singleton('avatar_manager'),
  current_level,
  testing_level,
  highest_level = read_in_cookie() || 1;

  input.add_subscriber(this);

  function update(delta){
    if (game_paused){return;}
    avatar_manager.update(delta);
    level_manager.update(delta);
    dom_manager.display_charges(avatar_manager.get_avatar().charges);
  }

  function start_game(){
    current_level = 1;
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
    }else if (button == 'level_editor_back'){
      dom_manager.close_screen('level_editor');
      level_editor_mode = false;
      dom_manager.open_screen('start_screen');
    }else if (button == 'select_level_back'){
      dom_manager.close_screen('select_level');
      dom_manager.open_screen('start_screen');
    }else if (button == 'custom_level_back'){
      dom_manager.close_screen('custom_level');
      dom_manager.open_screen('start_screen');
    }else if (button.substring(0,6) == 'level_'){
      current_level = parseInt(button.substring(6));
      start_level();
      dom_manager.close_screen('select_level');
      dom_manager.open_screen('game_background');
      dom_manager.open_screen('play_game');
    }else if(button == 'restart_level'){
      level_ready = false;
      start_level();
    }else if(button == 'quit_level'){
      if (testing_level){
        dom_manager.open_screen('level_editor');
        level_editor_mode = true;
      }else{
        dom_manager.open_screen('select_level');
      }
      dom_manager.close_screen('game_background');
      dom_manager.close_screen('play_game');
    }else if(button == 'back_to_start'){
      dom_manager.close_screen('game_complete');
      dom_manager.open_screen('start_screen');
    }else if(button == 'custom'){
      dom_manager.close_screen('start_screen');
      dom_manager.open_screen('custom_level');
    }else if(button == 'play_custom'){
      set_up_custom_level(eval(dom_manager.get_custom_level_input()));
      dom_manager.close_screen('custom_level');
    }else if(button == 'build'){
      dom_manager.close_screen('start_screen');
      dom_manager.open_screen('level_editor');
      level_editor_mode = true;
    }else{
      // console.log(button);
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

  function set_up_custom_level(level, testing){
    CONTENT.levels['0'] = level;
    current_level = 0;
    testing_level = !!testing;
    start_level();
  }

  this.update = update;
  this.key_pressed = function(){};
  this.button_pressed = button_pressed;
  this.start_game = start_game;
  this.level_complete = level_complete;
  this.reset_level = reset_level;
  this.game_complete = game_complete;
  this.set_up_custom_level = set_up_custom_level;

};


