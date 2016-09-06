// like objective, but for gates

var GateGenerator = function(config,spots){

  this.spot = spots[config.s];
  this.gates = config.g;
  this.gate_paths = config.gp;
  this.pos_x = this.spot.pos_x;
  this.pos_y = this.spot.pos_y;
  this.size = 10;

  function blow_up(){
    // console.log('gate generator: boom mother FUCKA!!');
  };

  this.blow_up = blow_up;

  this.graphic = {
    lineWidth: 1,
    fillStyle: 'rgba(204, 104, 51, 0.6)',
    shadowColor: '#6FC3DF',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }

};
