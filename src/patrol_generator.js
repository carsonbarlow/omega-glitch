// manages patrol_generators

var PatrolGenerator = function(config,spots){
  this.spot = spots[config.s];
  this.patrols = config.p;
  this.pos_x = this.spot.pos_x;
  this.pos_y = this.spot.pos_y;
  this.size = 10;


  function blow_up(){
  };

  this.blow_up = blow_up;

  this.graphic = {
    lineWidth: 1,
    fillStyle: 'rgba(84, 84, 51, 0.6)',
    shadowColor: '#6FC3DF',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  };
}
