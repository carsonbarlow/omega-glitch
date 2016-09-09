// Manages gameplay tips

var PlayTip = function(config){
  this.tip_text = GAME_TEXT[config.t],
  this.pos_x = config.x;
  this.pos_y = config.y;
};
