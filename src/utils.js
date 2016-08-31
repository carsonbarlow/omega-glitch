// globally accessible functions

var Utils = function(){
   function normalize(from_x, from_y, to_x, to_y){
    x_dif = to_x - from_x;
    y_dif = to_y - from_y;
    var hyp = (x_dif*x_dif)+(y_dif*y_dif);
    hyp = Math.sqrt(hyp);
    return [(x_dif/hyp),(y_dif/hyp)];
  };

  function check_collision(obj_1, obj_2){
    return (proximity(obj_1, obj_2) < (obj_1.collision + obj_2.collision));
  }

  function proximity(obj_1, obj_2){
    var x_dif = obj_1.pos_x - obj_2.pos_x;
    var y_dif = obj_1.pos_y - obj_2.pos_y;
    return Math.sqrt((x_dif*x_dif)+(y_dif*y_dif));
  }

  this.normalize = normalize;
  this.check_collision = check_collision;

};

utils = new Utils();
