// gate object

var Gate = function(config){
  this.pos_x = config.x;
  this.pos_y = config.y;
  this.path = config.p;

  function blow_up(){
    // console.log('gate: boom mother FUCKA!!');
  };

  this.blow_up = blow_up;
}