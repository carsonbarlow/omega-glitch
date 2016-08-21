// level manager

var LevelManager = function(){


  var level;

  function setup_level(num){
    level = CONTENT.levels[String(num)];
    console.log(level);
  };




  this.setup_level = setup_level;


};
