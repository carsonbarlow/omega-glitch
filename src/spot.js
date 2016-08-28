// Spot Model

var Spot = function(config){
  this.x = config.x;
  this.y = config.y;
  this.north = config.n;
  this.east = config.e;
  this.south = config.s;
  this.west = config.w;
  this.charge = config.charge || false;
}