// bootstraps the game
var game;


window.onload = function(e){
  game = new Game();
};


var Game = function(){

  var game_master = new GameMaster();
  level_editor = new LevelEditor();
  graphics = new Graphics(),
  input = new Input(),
  dom_manager = new DomManager();
  input.set_up_button_events();

  game_master.inject_graphics(graphics);
  game_master.inject_input(input);
  game_master.inject_dom_manager(dom_manager);
  game_master.inject_level_editor(level_editor);
  level_editor.inject_game_master(game_master);
  level_editor.inject_input(input);
  level_editor.inject_dom_manager(dom_manager);


  function update(delta){
    if (!level_ready){return;} // level_ready is found in game_master.js
    game_master.update(delta);
  }

  var run = (function() {
    var update_interval = 1000 / CONFIG.fps;
    var start_tick = next_tick = last_tick = (new Date).getTime();
    num_frames = 0;

    return function() {
      current_tick = (new Date).getTime();
      while ( current_tick > next_tick ) {
        delta = (current_tick - last_tick) / 1000;
        update(delta);
        next_tick += update_interval;
        last_tick = (new Date).getTime();
      }

      graphics.draw();

      // fps = (num_frames / (current_tick - start_tick)) * 1000;
      // Game.graphics.fps_counter.textContent = Math.round(fps);
      num_frames++;
    }
  })();

  // document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  if( window.requestAnimationFrame) {
    window.each_frame = function(cb) {
      var _cb = function() { cb(); requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    window.each_frame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    window.each_frame = function(cb) {
      setInterval(cb, 1000 / CONFIG.fps);
    }
  }
  window.each_frame(run);
  // game_master.start_game();

};

