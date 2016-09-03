// object responsible for objective logic

var Objective = function(config){


  this.spot = config[0];
  this.paths = config[1]

  function blow_up(){
    // console.log('boom mother FUCKA!!');
  };

  this.blow_up = blow_up;

};
