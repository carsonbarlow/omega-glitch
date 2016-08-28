// manages level environment including creation and destruction

var LevelManager = function(){

  var level, graphics, avatar_manager, game_master;
  var spots, paths, objectives, patrols;
  this.starting_spot;

  function setup_level(num){
    level = CONTENT.levels[String(num)];
    avatar_manager.set_avatar_charges(level.charges);
    for (var spot in level.spots){
      var new_spot = new Spot(level.spots[spot]);
      spots[spot] = new_spot;
      graphics.add_spot(new_spot);
    }
    this.starting_spot = spots[level.start];
    for (i = 0; i < level.paths.length; i++){
      var path = new Path(level.paths[i]);
      path.inject_graphics(graphics);
      path.set_starting_spot(spots[level.paths[i][0]]); // value at index 0 matches the index of the starting path.
      paths.push(path);
    }
    for (i = 0; i < level.objectives.length; i++){
      var objective = new Objective(spots[level.objectives[i]]);
      graphics.add_objective(objective);
      objectives.push(objective);
    }
    for (i = 0; i < level.patrols.length; i++){
      var patrol = new Patrol(level.patrols[i]);
      patrols.push(patrol);
    }
  };

  function move_leads_to(spot, direction){
    if (!spot[direction]){
      return false;
    }
    return {spot: spots[spot[direction][0]], path: paths[spot[direction][1]]}; // spot[direction][0] gets the index of the spot it is connected to.
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
  }

  function inject_avatar_manager(_avatar_manager_){
    avatar_manager = _avatar_manager_;
  }

  function inject_game_master(_game_master_){
    game_master = _game_master_;
  }

  function detonate_charge(spot){
    for (var i = 0; i < objectives.length; i++){
      if (objectives[i].spot == spot){
        objectives[i].blow_up();
        graphics.remove_objective(objectives[i]);
        objectives.splice(i,1);
        if (!objectives.length){
          game_master.level_complete();
        }
      }
    }
  }

  function clear_level(){
    graphics.clear_level();
    spots = {};
    paths = [];
    objectives = [];
    patrols = [];
  }


  this.setup_level = setup_level;
  this.inject_graphics = inject_graphics;
  this.inject_avatar_manager = inject_avatar_manager;
  this.inject_game_master = inject_game_master;
  this.move_leads_to = move_leads_to;
  this.detonate_charge = detonate_charge;
  this.clear_level = clear_level;

};
