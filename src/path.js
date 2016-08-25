// object responsible for constructing paths between spots

var Path = function(config){

  var graphics;
  var starting_spot;
  var checkpoints;

  function set_starting_spot(spot){
    starting_spot = spot;
    this.checkpoints = construct_checkpoints();
    graphics.add_path(checkpoints); // must come after inject_graphics
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
  }

  function construct_checkpoints(){
    checkpoints = [];
    checkpoints.push({x:starting_spot.x * CONFIG.grid_size, y:starting_spot.y * CONFIG.grid_size});
    var direction, magnatude;
    for (var i = 1; i < config.length; i+=2){
      direction = config[i];
      magnatude = config[i+1];
      checkpoints.push({
        x: (CONFIG.direction_to_grid_difference[direction].x * CONFIG.grid_size * magnatude) + checkpoints[checkpoints.length-1].x,
        y: (CONFIG.direction_to_grid_difference[direction].y * CONFIG.grid_size * magnatude) + checkpoints[checkpoints.length-1].y
      });
      // console.log(checkpoints);
    }
    return checkpoints;
  }

  




  this.set_starting_spot = set_starting_spot;
  this.inject_graphics = inject_graphics;
  this.checkpoints = checkpoints;
};



// [0,3,12]