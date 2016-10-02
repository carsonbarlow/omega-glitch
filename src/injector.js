var injector;

var Injector = function(){

  var classes = {
    avatar_manager: AvatarManager,
    dom_manager: DomManager,
    game_master: GameMaster,
    gate: Gate,
    gate_generator: GateGenerator,
    gate_generator_path: GateGeneratorPath,
    graphics: Graphics,
    input: Input,
    level_editor: LevelEditor,
    level_manager: LevelManager,
    objective: Objective,
    path: Path,
    patrol: Patrol,
    patrol_generator: PatrolGenerator,
    play_tip: PlayTip,
    spot: Spot
  }

  var singletons = {};

  var get_singleton = function(class_name){
    if (!singletons[class_name]){
      singletons[class_name] = {};
      singletons[class_name] = new classes[class_name]();
    }
    return singletons[class_name];
  };

  var get_object = function(class_name, params){
    return new classes[class_name](params);
  }

  this.get_singleton = get_singleton;
  this.get_object = get_object;

};
