// manages level environment including creation and destruction

var LevelManager = function(){

  var level,
    graphics = injector.get_singleton('graphics'),
    avatar_manager = injector.get_singleton('avatar_manager'),
    game_master;
  var spots, paths, objectives, patrols, patrol_generators, gates, gate_generators, play_tips;
  this.starting_spot;

  function setup_level(num){
    game_master = injector.get_singleton('game_master');
    level = CONTENT.levels[String(num)];
    avatar_manager.set_avatar_charges(level.charges);
    for (var spot in level.spots){
      var new_spot = injector.get_object('spot', level.spots[spot]);
      spots[spot] = new_spot;
    }
    this.starting_spot = spots[level.start];
    for (i = 0; i < level.paths.length; i++){
      var path = injector.get_object('path', level.paths[i]);
      path.set_starting_spot(spots[level.paths[i][0]]); // value at index 0 matches the index of the starting path.
      paths.push(path);
    }
    for (i = 0; i < level.objectives.length; i++){
      var objective = injector.get_object('objective', {config: level.objectives[i], spots:spots})
      objectives.push(objective);
    }
    for (i = 0; i < level.patrols.length; i++){
      var patrol = injector.get_object('patrol', level.patrols[i]);
      patrol.make_path_list(paths, spots);
      patrols.push(patrol);
    }
    for (i = 0; i < level.patrol_generators.length; i++){
      var patrol_generator = injector.get_object('patrol_generator', {config: level.patrol_generators[i], spots: spots});
      patrol_generators.push(patrol_generator);
    }
    for (i = 0; i < level.gates.length; i++){
      var gate = injector.get_object('gate', level.gates[i]);
      gates.push(gate);
    }
    for (i = 0; i < level.gate_generators.length; i++){
      var gate_generator = injector.get_object('gate_generator', {config: level.gate_generators[i], spots: spots});
      gate_generators.push(gate_generator);
    }
    if (level.tips){
      for (i = 0; i < level.tips.length; i++){
        play_tips.push(injector.get_object('play_tip', level.tips[i]));
      }
    }
  };

  function move_leads_to(spot, direction){
    if (!spot[direction]){
      return false;
    }
    var response = {spot: spots[spot[direction][0]], path: paths[spot[direction][1]]}; // spot[direction][0] gets the index of the spot it is connected to.
    return (response.path.blocked)? false : response;
  }

  function avatar_on_spot(spot){
    for (var i = 0; i < objectives.length; i++){
      if (objectives[i].pos_x == spot.pos_x && objectives[i].pos_y == spot.pos_y){
        for (var p = 0; p < objectives[i].paths.length; p++){
          paths[objectives[i].paths[p]].threaten();
        }
      }
    }
  }

  function avatar_leaving_spot(){
    for (var i = 0; i < paths.length; i++){
      paths[i].unthreaten();
    }
  }

  function detonate_charge(spot){
    for (var i = 0; i < objectives.length; i++){
      if (objectives[i].spot == spot){
        objectives[i].blow_up();
        graphics.remove_from_manifest(objectives[i], 'objectives');
        for (var path = objectives[i].paths.length -1; path > -1; path--){
          paths[objectives[i].paths[path]].blow_up();
          for (var patrol = 0; patrol < patrols.length; patrol++){
            if (patrols[patrol].get_current_path() === paths[objectives[i].paths[path]]){
              patrols[patrol].blow_up();
            }
          }
        }
        objectives.splice(i,1);
        if (!objectives.length){
          if (level.end_of_game){
            game_master.game_complete();
          }else{
            game_master.level_complete();
          }
        }
      }
    }
    for (i = 0; i < patrol_generators.length; i++){
      if (patrol_generators[i].spot == spot){
        patrol_generators[i].blow_up();
        for (var patrol = patrol_generators[i].patrols.length -1; patrol > -1 ; patrol--){
          patrols[patrol_generators[i].patrols[patrol]].blow_up();
        }
        graphics.remove_from_manifest(patrol_generators[i], 'patrol_generators');
      }
    }
    for (i = 0; i < gate_generators.length; i++){
      if (gate_generators[i].spot == spot){
        gate_generators[i].blow_up();
        for (var gate = gate_generators[i].gates.length - 1; gate > -1 ; gate--){
          gates[gate_generators[i].gates[gate]].blow_up();
          graphics.remove_from_manifest(gates[gate_generators[i].gates[gate]], 'gates');
          // paths[gates[gate_generators[i].gates[gate]].path].blocked = false;
          graphics.remove_from_manifest(gate_generators[i], 'gate_generators');
        }
      }
    }
  }

  function get_play_tips(){
    return play_tips;
  }

  function clear_level(){
    spots = {};
    paths = [];
    objectives = [];
    patrols = [];
    patrol_generators = [];
    gates = [];
    gate_generators= [];
    play_tips = [];
  }

  function update(delta){
    for (var i = 0; i < patrols.length; i++){
      patrols[i].update(delta);
      if (patrols[i].is_active() && utils.check_collision(patrols[i].get_unit(), avatar_manager.get_avatar())){
        game_master.reset_level();
      }
    }
    for (i = 0; i < gates.length; i++){
      if (gates[i].is_active() && !avatar_manager.get_gate_hit() && utils.check_collision(gates[i], avatar_manager.get_avatar())){
        avatar_manager.hit_gate();
      }
    }
  }


  this.setup_level = setup_level;
  this.get_play_tips = get_play_tips;
  this.move_leads_to = move_leads_to;
  this.avatar_on_spot = avatar_on_spot;
  this.avatar_leaving_spot = avatar_leaving_spot;
  this.detonate_charge = detonate_charge;
  this.clear_level = clear_level;
  this.update = update;

};
