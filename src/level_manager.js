// manages level environment including creation and destruction

var LevelManager = function(){

  var level, graphics, avatar_manager;
  var spots = [];
  var paths = [];
  this.starting_spot;

  function setup_level(num){
    spots = [];
    level = CONTENT.levels[String(num)];
    graphics.clear_level();
    for (var i = 0; i < level.spots.length; i++){
      var spot = new Spot(level.spots[i]);
      spots.push(spot);
      graphics.add_spot(spot);
    }
    this.starting_spot = spots[level.start];
    for (i = 0; i < level.paths.length; i++){
      var path = new Path(level.paths[i]);
      path.inject_graphics(graphics);
      path.set_starting_spot(spots[level.paths[i][0]]); // value at index 0 matches the index of the starting path.
    }
  };

  function move_leads_to(spot, direction){
    if (!spot[direction]){
      return false;
    }
    return spots[spot[direction][0]]; // spot[direction][0] gets the index of the spot it is connected to.
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
  }

  function inject_avatar_manager(_avatar_manager_){
    avatar_manager = _avatar_manager_;
  }

  this.setup_level = setup_level;
  this.inject_graphics = inject_graphics;
  this.inject_avatar_manager = inject_avatar_manager;
  this.move_leads_to = move_leads_to;

};
