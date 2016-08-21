// manages level environment including creation and destruction

var LevelManager = function(){

  var level, graphics, avatar_manager;
  var spots = [];
  this.starting_spot;

  function setup_level(num){
    spots = [];
    level = CONTENT.levels[String(num)];
    for (var i = 0; i < level.spots.length; i++){
      var spot = new Spot(level.spots[i]);
      spots.push(spot);
      graphics.add_to_draw_list(spot, CONFIG.BACKGROUND);
    }
    this.starting_spot = spots[level.start];
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
