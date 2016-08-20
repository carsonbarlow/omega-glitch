var AvatarManager = function(){

  var avatar = {
    pos_x: 0,
    pox_y: 0,
    charges: 0
  };

  var moving = false,
  speed = 3;


  function move_avatar(delta){
    avatar.pos_x += speed;
  }




  this.update = function(delta){
    move_avatar(delta);
  }


  this.get_avatar = function(){
    return avatar;
  };


};