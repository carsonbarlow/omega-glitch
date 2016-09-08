// handles input (observer class)
var Input = function(){

  var subscribers = [];
  var buttons = [//];
  'campaign',
  'custom',
  'build',
  'restart_level',
  'quit_level',
  'back_to_start'
  ];

  function add_button(id){
    buttons.push(id);
  }

  function set_up_button_events(){
    for (var i = 0; i < buttons.length; i++){
      var button = document.getElementById(buttons[i]);
      (function(_i_){
        button.addEventListener('mouseup', function(){
          for (var s = 0; s < subscribers.length; s++){
            subscribers[s].button_pressed(buttons[_i_]);
          }
        });
      })(i);
    }
  }

  window.addEventListener('keydown',function(event){
    for (var i = 0; i < subscribers.length; i++){
      subscribers[i].key_pressed(event.key);
    }
  });


  function add_subscriber(subscriber){
    if (subscribers.indexOf(subscriber) === -1){
      subscribers.push(subscriber);
    }
  }

  function remove_subscriber(subscriber){
    if (subscribers.indexOf(subscriber) !== -1){
      subscriber.splice(subscribers.indexOf(subscriber),1);
    }
  }

  this.add_subscriber = add_subscriber;
  this.remove_subscriber = remove_subscriber;
  this.set_up_button_events = set_up_button_events;
  this.add_button = add_button;

};













  // window.addEventListener('keyup',function(event){
  //   Game.input.keyboard[Game.input.keyboard.id_to_key[event.keyIdentifier]] = false;
  //   if (event.keyIdentifier == 'U+0050'){Game.paused = !Game.paused;
  //   } else if (event.keyIdentifier == 'U+0031'){Game.player.exp.selected = 'melee';
  //   } else if (event.keyIdentifier == 'U+0032'){Game.player.exp.selected = 'ranged';
  //   } else if (event.keyIdentifier == 'U+0033'){Game.player.exp.selected = 'bomb';
  // }
  // });










  // Game.input = {};
  // Game.input.keyboard = {};
  // Game.input.keyboard.a = false;
  // Game.input.keyboard.s = false;
  // Game.input.keyboard.d = false;
  // Game.input.keyboard.w = false;
  // Game.input.keyboard.r = false;
  // Game.input.keyboard.space = false;
  // Game.input.mouse = {};
  // Game.input.mouse.x = 0;
  // Game.input.mouse.y = 0;
  // Game.input.mouse.left = false;
  // Game.input.mouse.right = false;
  // Game.input.keyboard.id_to_key = {'U+0041':'a', 'U+0053':'s', 'U+0044':'d', 'U+0057':'w', 'U+0020':'space', 'U+0052':'r'};

  // Game.graphics.canvas.addEventListener('mousedown',function(event){
    
  //   if (!event.which && event.button) {
  //     if (event.button & 1) event.which = 1      // Left
  //     else if (event.button & 4) event.which = 2 // Middle
  //     else if (event.button & 2) event.which = 3 // Right
  //   } 
  //   switch (event.button || event.which){
  //     case 1:
  //       Game.input.mouse.left = true;
  //     break;
  //     case 2:
  //       Game.input.mouse.right = true;
  //     break;
  //   }
  //   event.preventDefault();
  // });
  // window.addEventListener('mouseup', function(event){
  //   if (!event.which && event.button) {
  //     if (event.button & 1) event.which = 1      // Left
  //     else if (event.button & 4) event.which = 2 // Middle
  //     else if (event.button & 2) event.which = 3 // Right
  //   } 
  //   switch (event.button || event.which){
  //     case 1:
  //       Game.input.mouse.left = false;
  //     break;
  //     case 2:
  //       Game.input.mouse.right = false;
  //     break;
  //   } 
  // });
  // Game.graphics.canvas.addEventListener('mousemove', function(event){
  //   Game.input.mouse.x = event.x - Game.graphics.canvas.offsetLeft;
  //   Game.input.mouse.y = event.y - Game.graphics.canvas.offsetTop;
  // });
  