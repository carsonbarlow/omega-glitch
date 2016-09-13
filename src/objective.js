// object responsible for objective logic

var Objective = function(config, spots){


  this.spot = spots[config[0]];
  this.paths = config[1]
  this.size = 15;
  this.pos_x = this.spot.pos_x;
  this.pos_y = this.spot.pos_y;

  this.graphic = {
    lineWidth: 1,
    fillStyle: 'rgba(250,247,91,0.2)',
    shadowColor: '#6FC3DF',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }

  function blow_up(){
  };

  this.blow_up = blow_up;

};
