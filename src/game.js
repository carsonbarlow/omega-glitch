// console.log('hello world');

var game;

window.onload = function(e){
  game = new Game();
};


var Game = function(){

  var paused = false
  var game_master = new GameMaster();
  graphics = new Graphics();

  game_master.inject_graphics(graphics);


  function update(delta){
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

      fps = (num_frames / (current_tick - start_tick)) * 1000;
      // Game.graphics.fps_counter.textContent = Math.round(fps);
      num_frames++;
    }
  })();

  document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
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
  game_master.start_game();

};


//   Game.reset_game = function (){
//     if (Game.player.isDead){
//       Game.enemies = [];
//       Game.projectiles = [];
//       Game.graphics.draw_list = [[],[],[]];
//       Game.bm._reset();
//       Game.player._reset();
//       Game.graphics.camera = {x:0,y:0};
//     }
//   }
// };