// gate object

var Gate = function(config){
  this.pos_x = config.x * CONFIG.grid_size;
  this.pos_y = config.y * CONFIG.grid_size;
  this.path = config.p;
  this.size = 10;

  function blow_up(){
    // console.log('gate: boom mother FUCKA!!');
  };

  this.blow_up = blow_up;

  this.graphic = {
    lineWidth: 1,
    fillStyle: 'rgba(204, 51, 51, 0.6)',
    shadowColor: '#6FC3DF',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  };
}