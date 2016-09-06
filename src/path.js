// object responsible for constructing paths between spots

var Path = function(config){

  var graphics;
  var starting_spot;
  var checkpoints;

  function set_starting_spot(spot){
    starting_spot = spot;
    this.checkpoints = construct_checkpoints();
    graphics.add_to_manifest(checkpoints, 'paths');
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
  }

  function construct_checkpoints(){
    checkpoints = [];
    checkpoints.push({x:starting_spot.pos_x, y:starting_spot.pos_y});
    var direction, magnatude;
    for (var i = 1; i < config.length; i+=2){
      direction = config[i];
      magnatude = config[i+1];
      checkpoints.push({
        x: (CONFIG.direction_to_grid_difference[direction].x * CONFIG.grid_size * magnatude) + checkpoints[checkpoints.length-1].x,
        y: (CONFIG.direction_to_grid_difference[direction].y * CONFIG.grid_size * magnatude) + checkpoints[checkpoints.length-1].y
      });
    }
    return checkpoints;
  }

  function blow_up(){
    // console.log('path '+starting_spot+': boom mother FUCKA!!');
    // graphics.remove_path(checkpoints);
    graphics.remove_from_manifest(checkpoints, 'paths');
    this.blocked = true;
    this.blown_up = true;
  };


  this.set_starting_spot = set_starting_spot;
  this.inject_graphics = inject_graphics;
  this.checkpoints = checkpoints;
  this.blow_up = blow_up;

};

