// manages patrol_generators

var PatrolGenerator = function(config){
  this.spot = config.s;
  this.patrols = config.p;

  function blow_up(){
    // console.log('patrol generator: boom mother FUCKA!!');
  };

  this.blow_up = blow_up;
}
