// interfaces with the dom

var DomManager = function(){


  var screens = {
    start_screen: document.getElementById('start_screen'),
    select_level: document.getElementById('select_level'),
    game_complete: document.getElementById('game_complete')
  };
  var play_tip_display = document.getElementById('play_tips');

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

  function place_game_tips(play_tips){
    play_tip_display.innerHTML = '';
    for (var i = 0; i < play_tips.length; i++){
      var tip = document.createElement('div');
      tip.classList.add('play_tip');
      tip.style.left = play_tips[i].pos_x + 'px';
      tip.style.top = play_tips[i].pos_y + 'px';
      tip.textContent = play_tips[i].tip_text;
      play_tip_display.appendChild(tip);
    }
  }

  this.close_screen = close_screen;
  this.open_screen = open_screen;
  this.unlock_levels = unlock_levels;
  this.place_game_tips = place_game_tips;


};
