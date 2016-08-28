// renders game objects onto canvas

var Graphics = function(){

  var canvas = document.getElementById(CONFIG.canvas_id),
  ctx = canvas.getContext('2d'),
  paths = [],
  spots = [],
  objectives = [],
  patrols = [],
  CANVAS_WIDTH = canvas.width,
  CANVAS_HEIGHT = canvas.height,
  avatar;

  function draw(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    draw_paths();
    draw_spots();
    draw_objectives();
    draw_patrols();

    ctx.save();
    ctx.lineWidth = 0;
    ctx.fillStyle = 'rgba(95,232,232,0.7)';
    ctx.beginPath();
    ctx.arc(avatar.pos_x, avatar.pos_y, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

  }

  function inject_avatar(_avatar_){
    avatar = _avatar_;
  }

  function clear_level(){
    paths = [];
    spots = [];
    objectives = [];
    patrols = [];
  }

  function add_spot(spot){
    if (spots.indexOf(spot) === -1){
      spots.push(spot);
    }
  }

  function draw_spots(){
    ctx.save();
    
    for (var i = 0; i < spots.length; i++){
      draw_spot(spots[i]);
    }
    ctx.restore();
  }

  function draw_spot(spot){
    ctx.strokeStyle = '#cc3399';
    ctx.fillStyle = 'rgba(204, 51, 153, 0.8)';
    ctx.beginPath();
    ctx.arc(spot.x * CONFIG.grid_size, spot.y * CONFIG.grid_size, CONFIG.grid_size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if (spot.charge){
      draw_charge(spot);
    }
  }

  function draw_charge(spot){
    ctx.strokeStyle = "#8888DD";
    ctx.fillStyle = "#8888DD";
    ctx.arc(spot.x * CONFIG.grid_size, spot.y * CONFIG.grid_size, 4, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  function add_path(path){
    if (paths.indexOf(path) === -1){
      paths.push(path);
    }
  }

  function draw_paths(){
    ctx.save();
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#33cc33';
    for (var i = 0; i < paths.length; i++){
      draw_path(paths[i]);
    }
    ctx.restore();
  }

  function draw_path(path){
    ctx.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i++){
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
  }

  function add_objective(objective){
    if (objectives.indexOf(objective) === -1){
      objectives.push(objective);
    }
  }

  function remove_objective(objective){
    if (objectives.indexOf(objective) === -1){
        return;
      }
    objectives.splice(objectives.indexOf(objective),1);
  }

  function draw_objectives(){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = 'rgba(51, 204, 204, 0.8)'
    for (var i = 0; i < objectives.length; i++){
      draw_objective(objectives[i]);
    }
    ctx.restore();
  }


  function draw_objective(objective){
    var x = objective.spot.x * CONFIG.grid_size;
    var y = objective.spot.y * CONFIG.grid_size;


    var size = 20;

    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.fill();
    ctx.stroke();
    
  }

  function add_patrol(patrol){
    if (patrols.indexOf(patrol) === -1){
      patrols.push(patrol);
    }
  }

  function remove_patrol(patrol){
    if (patrols.indexOf(patrol) === -1){
      return;
    }
    patrols.splice(patrols.indexOf(patrol),1);
  }

  function draw_patrols(){
    for (var i = 0; i < patrols.length; i++){
      draw_patrol(patrols[i]);
    }
  }

  function draw_patrol(patrol){
    ctx.save();
    ctx.lineWidth = 0;
    ctx.fillStyle = 'rgba(232,92,92,0.7)';
    ctx.beginPath();
    ctx.arc(patrol.pos_x, patrol.pos_y, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }


  this.draw = draw;
  this.add_spot = add_spot;
  this.add_path = add_path;
  this.clear_level = clear_level;
  this.add_objective = add_objective;
  this.remove_objective = remove_objective;
  this.inject_avatar = inject_avatar;
  this.add_patrol = add_patrol;
  this.remove_patrol = remove_patrol;

};

