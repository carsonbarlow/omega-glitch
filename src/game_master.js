// mediates game flow
var GameMaster = function(){

  var graphics,
  input,
  current_level,
  avatar_manager = new AvatarManager();
  level_manager = new LevelManager();

  avatar_manager.inject_level_manager(level_manager);
  level_manager.inject_avatar_manager(avatar_manager);

  function update(delta){
    avatar_manager.update(delta);
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
    graphics.add_avatar(avatar_manager.get_avatar());
    level_manager.inject_graphics(_graphics_);
  }

  function inject_input(_input_){
    input = _input_;
    avatar_manager.inject_input(_input_);
  }

  function start_game(){
    current_level = 1;
    start_level();
  };

  function start_level(){
    level_manager.setup_level(current_level);
    avatar_manager.start_level();
  }

  this.update = update;
  this.inject_graphics = inject_graphics;
  this.inject_input = inject_input;
  this.start_game = start_game;

};

