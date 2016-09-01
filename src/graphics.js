// renders game objects onto canvas

var Graphics = function () {

  var canvas = document.getElementById(CONFIG.canvas_id),
    ctx = canvas.getContext('2d'),
    paths = [],
    spots = [],
    objectives = [],
    patrols = [],
    patrol_generators = [],
    gates = [],
    gate_generators = [],
    CANVAS_WIDTH = canvas.width,
    CANVAS_HEIGHT = canvas.height,
    avatar;

  function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    draw_paths();
    draw_spots();
    draw_objectives();
    draw_patrols();
    draw_patrol_generators();
    draw_gates();
    draw_gate_generators();

    ctx.save();
    ctx.lineWidth = 0;
    ctx.fillStyle = 'rgba(250,247,91,0.7)';
    ctx.shadowColor = '#39b5a6';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(avatar.pos_x, avatar.pos_y, avatar.collision, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = 'rgba(210,210,210,0.5)';
    ctx.fillText('Charges:'+ avatar.charges, 33, 27);

  }

  function inject_avatar(_avatar_) {
    avatar = _avatar_;
  }

  function clear_level() {
    paths = [];
    spots = [];
    objectives = [];
    patrols = [];
    patrol_generators = [],
    gates = [];
    gate_generators = [];
  }

  function add_spot(spot) {
    if (spots.indexOf(spot) === -1) {
      spots.push(spot);
    }
  }

  function draw_spots() {
    ctx.save();

    for (var i = 0; i < spots.length; i++) {
      draw_spot(spots[i]);
    }
    ctx.restore();
  }

  function draw_spot(spot) {
    ctx.fillStyle = 'rgba(254, 254, 254, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#29c8df';
    ctx.shadowColor = '#5ad4e6';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(spot.x * CONFIG.grid_size, spot.y * CONFIG.grid_size, CONFIG.grid_size/2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (spot.charge) {
      draw_charge(spot);
    }
  }

  function draw_charge(spot) {
    ctx.fillStyle = "rgba(212, 17, 27, 0.6)";
    ctx.shadowColor = '#d0161e';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(spot.x * CONFIG.grid_size, spot.y * CONFIG.grid_size, 4, 0, Math.PI * 2, true);
    // ctx.closePath();
    ctx.fill();
    // ctx.stroke();
  }

  function add_path(path) {
    if (paths.indexOf(path) === -1) {
      paths.push(path);
    }
  }

  function draw_paths() {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#d1f3f8';
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (var i = 0; i < paths.length; i++) {
      draw_path(paths[i]);
    }
    ctx.restore();
  }

  function draw_path(path) {
    ctx.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
  }

  function add_objective(objective) {
    if (objectives.indexOf(objective) === -1) {
      objectives.push(objective);
    }
  }

  function remove_objective(objective) {
    if (objectives.indexOf(objective) === -1) {
      return;
    }
    objectives.splice(objectives.indexOf(objective), 1);
  }

  function draw_objectives() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(51, 204, 204, 0.2)'
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (var i = 0; i < objectives.length; i++) {
      draw_objective(objectives[i]);
    }
    ctx.restore();
  }


  function draw_objective(objective) {
    var x = objective.spot.x * CONFIG.grid_size;
    var y = objective.spot.y * CONFIG.grid_size;


    var size = 15;
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.fill();
    ctx.stroke();

  }

  function add_patrol(patrol) {
    if (patrols.indexOf(patrol) === -1) {
      patrols.push(patrol);
    }
  }

  function remove_patrol(patrol) {
    if (patrols.indexOf(patrol) === -1) {
      return;
    }
    patrols.splice(patrols.indexOf(patrol), 1);
  }

  function draw_patrols() {
    for (var i = 0; i < patrols.length; i++) {
      draw_patrol(patrols[i]);
    }
  }

  function draw_patrol(patrol) {
    ctx.save();
    ctx.lineWidth = 0;
    ctx.fillStyle = '#cf131c';
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(patrol.pos_x, patrol.pos_y, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function add_gate(gate){
    if (gates.indexOf(gate) === -1) {
      gates.push(gate);
    }
  }
  function remove_gate(gate){
    if (gates.indexOf(gate) === -1) {
      return;
    }
    gates.splice(gates.indexOf(gate), 1);
  }

  function draw_gates(){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(204, 51, 51, 0.6)'
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (var i = 0; i < gates.length; i++){
      draw_gate(gates[i]);
    }
    ctx.restore();
  }

  function draw_gate(gate){
    var x = gate.pos_x * CONFIG.grid_size;
    var y = gate.pos_y * CONFIG.grid_size;


    var size = 10;
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.fill();
    ctx.stroke();
  }

  function add_gate_generator(gate_generator){
    if (gate_generators.indexOf(gate_generator) === -1) {
      gate_generators.push(gate_generator);
    }
  }

  function remove_gate_generator(gate_generator){
    if (gate_generators.indexOf(gate_generator) === -1) {
      return;
    }
    gate_generators.splice(gate_generators.indexOf(gate_generator), 1);
  }

  function draw_gate_generators(){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(204, 104, 51, 0.6)'
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (var i = 0; i < gate_generators.length; i++){
      draw_gate_generator(gate_generators[i]);
    }
    ctx.restore();
  }

  function draw_gate_generator(gate_generator){
    var x = gate_generator.spot.x * CONFIG.grid_size;
    var y = gate_generator.spot.y * CONFIG.grid_size;


    var size = 10;
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.fill();
    ctx.stroke();
  }

  function add_patrol_generator(patrol_generator){
    if (patrol_generators.indexOf(patrol_generator) === -1) {
      patrol_generators.push(patrol_generator);
    }
  }

  function remove_patrol_generator(patrol_generator){
    if (patrol_generators.indexOf(patrol_generator) === -1) {
      return;
    }
    patrol_generators.splice(patrol_generators.indexOf(patrol_generator), 1);
  }

  function draw_patrol_generators(){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(84, 84, 51, 0.6)'
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (var i = 0; i < patrol_generators.length; i++){
      draw_patrol_generator(patrol_generators[i]);
    }
    ctx.restore();
  }

  function draw_patrol_generator(patrol_generator){
    var x = patrol_generator.spot.x * CONFIG.grid_size;
    var y = patrol_generator.spot.y * CONFIG.grid_size;


    var size = 10;
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.fill();
    ctx.stroke();
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
  this.add_gate = add_gate;
  this.remove_gate = remove_gate;
  this.add_gate_generator = add_gate_generator;
  this.remove_gate_generator = remove_gate_generator;
  this.add_patrol_generator = add_patrol_generator;
  this.remove_patrol_generator = remove_patrol_generator;

};

