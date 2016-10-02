// gate object

var Gate = function(config){

  var graphics = injector.get_singleton('graphics');

  this.pos_x = config.x * CONFIG.grid_size;
  this.pos_y = config.y * CONFIG.grid_size;
  this.size = 8;
  this.collision = 6;
  active = true;

  function blow_up(){
    active = false;
  };

  function is_active(){
    return active;
  }

  this.blow_up = blow_up;
  this.is_active = is_active;

  this.graphic = {
    lineWidth: 1,
    fillStyle: 'rgba(204, 51, 51, 0.6)',
    shadowColor: '#6FC3DF',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0
  };

  graphics.add_to_manifest(this, 'gates');
}