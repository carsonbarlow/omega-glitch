// Spot Model

var Spot = function(config){
  this.pos_x = config.x * CONFIG.grid_size;
  this.pos_y = config.y * CONFIG.grid_size;
  this.north = config.n;
  this.east = config.e;
  this.south = config.s;
  this.west = config.w;
  this.charge = config.charge || false;
  this.collision = CONFIG.grid_size/2;


  this.graphic = {
    fillStyle: 'rgba(254, 254, 254, 0.8)',
    lineWidth: 2,
    strokeStyle: '#29c8df',
    shadowColor: '#5ad4e6',
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }

};
