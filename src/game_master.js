
var GameMaster = function(){

  var graphics,
  current_level,
  avatar_manager = new AvatarManager();
  level_manager = new LevelManager();

  function update(delta){
    avatar_manager.update(delta);
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
    graphics.add_avatar(avatar_manager.get_avatar());
  }

  function start_game(){
    current_level = 1;
    start_level();
  };

  function start_level(){
    level_manager.setup_level(current_level);
  }



  this.update = update;
  this.inject_graphics = inject_graphics;
  this.start_game = start_game;

};


