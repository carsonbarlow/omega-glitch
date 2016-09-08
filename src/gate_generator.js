// like objective, but for gates

var GateGenerator = function(config,spots){

  var graphics;

  this.spot = spots[config.s];
  this.gates = config.g;
  var gate_paths = config.gp.slice(0);
  this.pos_x = this.spot.pos_x;
  this.pos_y = this.spot.pos_y;
  this.size = 10;

  for (var i = 0; i < gate_paths.length; i++){
    gate_paths[i] = new GateGeneratorPath(gate_paths[i]);
  }

  function inject_graphics(_graphics_){
    graphics = _graphics_;
    graphics.add_to_manifest(this, 'gate_generators');
    for (var i = 0; i < gate_paths.length; i++){
      gate_paths[i].inject_graphics(graphics);
      gate_paths[i].set_starting_spot(this.spot);
    }
  }

  function blow_up(){
    // console.log('gate generator: boom mother FUCKA!!');
    for (var i = 0; i < gate_paths.length; i++){
      gate_paths[i].blow_up();
    }
  };

  this.blow_up = blow_up;
  this.inject_graphics = inject_graphics;

  this.graphic = {
    lineWidth: 1,
    fillStyle: 'rgba(204, 104, 51, 0.6)',
    shadowColor: '#6FC3DF',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }

};
