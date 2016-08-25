// object responsible for constructing paths between spots

var Path = function(config){

  var graphics;
  var starting_spot;
  var checkpoints;

  function set_starting_spot(spot){
    starting_spot = spot;
    construct_checkpoints();
    graphics.add_path(checkpoints); // must come after inject_graphics
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
  }

  var direction_to_grid_difference = {
    '1': {x: 0, y: -1},
    '2': {x: 1, y: -1},
    '3': {x: 1, y:0},
    '4': {x:1 , y:1},
    '5': {x:0 , y:1},
    '6': {x:-1 , y:1},
    '7': {x:-1 , y:0},
    '8': {x:-1 , y:-1},
  }

// 1: north
// 2: north_east
// 3: east
// 4: south_east
// 5: south
// 6: south_west
// 7: west
// 8: north_west

  function construct_checkpoints(){
    checkpoints = [];
    checkpoints.push({x:starting_spot.x * CONFIG.grid_size, y:starting_spot.y * CONFIG.grid_size});
    var direction, magnatude;
    for (var i = 1; i < config.length; i+=2){
      direction = config[i];
      magnatude = config[i+1];
      checkpoints.push({
        x: (direction_to_grid_difference[direction].x * CONFIG.grid_size * magnatude) + checkpoints[checkpoints.length-1].x,
        y: (direction_to_grid_difference[direction].y * CONFIG.grid_size * magnatude) + checkpoints[checkpoints.length-1].y
      });
      // console.log(checkpoints);
    }
  }

  




  this.set_starting_spot = set_starting_spot;
  this.inject_graphics = inject_graphics;
};



// [0,3,12]