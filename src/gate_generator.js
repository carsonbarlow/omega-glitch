// like objective, but for gates

var GateGenerator = function(config){

  this.spot = config.s;
  this.gates = config.g;
  this.gate_paths = config.gp;

  function blow_up(){
    // console.log('gate generator: boom mother FUCKA!!');
  };

  this.blow_up = blow_up;

};
