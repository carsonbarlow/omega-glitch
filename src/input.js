// handles input (observer class)
var Input = function(){

  var subscribers = [];
  var buttons = [
  'campaign',
  'select_level_back',
  'level_editor_back',
  'custom',
  'build',
  'restart_level',
  'quit_level',
  'back_to_start',
  'play_custom',
  'add_spot',
  'add_objective',
  'add_charge',
  'add_gate_generator',
  'add_gate',
  'add_patrol_generator',
  'add_patrol',
  'export',
  'test_level',
  'path_n',
  'path_ne',
  'path_e',
  'path_se',
  'path_s',
  'path_sw',
  'path_w',
  'path_nw',
  'gpath_n',
  'gpath_ne',
  'gpath_e',
  'gpath_se',
  'gpath_s',
  'gpath_sw',
  'gpath_w',
  'gpath_nw'
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
