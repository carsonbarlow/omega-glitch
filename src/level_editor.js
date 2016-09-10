// manages the level editor

var LevelEditor = function(){

  var game_master,
    input,
    dom_manager;

  var level = {
    charges: 0,
    spots: {},
    paths: [],
    patrols: [],
    patrol_generators: [],
    start: false,
    objectives: [],
    gates: [],
    gate_generators: []
  };

  var x,y;

  function inject_game_master(_game_master_){
    game_master = _game_master_;
  }

  function inject_input(_input_){
    input = _input_;
    input.add_subscriber(this);
  }

  function inject_dom_manager(_dom_manager_){
    dom_manager = _dom_manager_;
  }

  function button_pressed(button){
    if (button.substring(0,5) == 'grid_'){
      x = parseInt(button.split('_')[1]);
      y = parseInt(button.split('_')[2]);
      dom_manager.select_grid_square(x,y);
    }
  }

  this.inject_game_master = inject_game_master;
  this.inject_input = inject_input;
  this.inject_dom_manager = inject_dom_manager;
  this.key_pressed = function(){};
  this.button_pressed = button_pressed;

}
