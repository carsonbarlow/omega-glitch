// interfaces with the dom

var DomManager = function(){


  var screens = {
    start_screen: document.getElementById('start_screen'),
    select_level: document.getElementById('select_level'),
    game_complete: document.getElementById('game_complete')
  };

  var button_array_width = 0;
  var button_array_height = 0;
  for (var i = 1; i <= Object.keys(CONTENT.levels).length; i++){
    var level_button = document.createElement('button');
    level_button.textContent = 'lv ' + i;
    level_button.id = 'level_'+i;
    level_button.classList.add('level_btn');
    level_button.classList.add('left_'+button_array_width);
    level_button.classList.add('top_'+button_array_height);
    level_button.disabled = true;
    button_array_width++
    if (button_array_width == CONFIG.level_button_width){
      button_array_width = 0;
      button_array_height++
    }
    screens.select_level.appendChild(level_button);
    input.add_button('level_'+i);
  }



  function close_screen(screen){
    // console.log(screen);
    screens[screen].classList.add('hidden');
  }

  function open_screen(screen){
    screens[screen].classList.remove('hidden');
  }

  function unlock_levels(level){
    for (var i = 1; i <= level; i++){
      var level_button = document.getElementById('level_'+i);
      level_button.disabled = false;
    }
  }

  this.close_screen = close_screen;
  this.open_screen = open_screen;
  this.unlock_levels = unlock_levels;


};
