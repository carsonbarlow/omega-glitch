// renders game objects onto canvas

var Graphics = function () {

  var draw_manifest = {
    spots: [],
    paths: [],
    objectives: [],
    patrols: [],
    patrol_generators: [],
    gates: [],
    gate_generators: [],
    avatar: []
  }

  var canvas = document.getElementById(CONFIG.canvas_id),
    ctx = canvas.getContext('2d'),
    CANVAS_WIDTH = canvas.width,
    CANVAS_HEIGHT = canvas.height,
    avatar;

  // var draw_order = ['paths','spots','objectives','patrols','patrol_generators','gates','gate_generators','avatar'];
  var draw_order = ['spots','objectives','patrols','patrol_generators','gates','gate_generators','avatar'];
  // var draw_order = ['spots','patrols','patrol_generators'];
  var draw_key = {
    // paths: draw_line,
    spots: draw_circle,
    objectives: draw_square,
    patrols: draw_circle,
    patrol_generators: draw_square,
    gates: draw_square,
    gate_generators: draw_square,
    avatar: draw_circle
  }

  function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    draw_paths();
    for (var list = 0; list < draw_order.length; list++){
      draw_manifest_list(draw_order[list]);
    }

    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = 'rgba(210,210,210,0.5)';
    ctx.fillText('Charges:' + avatar.charges, 33, 27);

  }

  function inject_avatar(_avatar_) {
    avatar = _avatar_;
  }

  function clear_level() {
    for (var item in draw_manifest){
      draw_manifest[item] = [];
    }
    draw_manifest.avatar = [avatar];
  }
  function add_to_manifest(item, type){
    var list = draw_manifest[type];
    if (list.indexOf(item) == -1){
      list.push(item);
    }
  }

  function remove_from_manifest(item, type){
    var list = draw_manifest[type];
    if (list.indexOf(item) != -1){
      list.splice(list.indexOf(item),1);
    }
  }

  function draw_manifest_list(name){
    var list = draw_manifest[name];
    for (var i = 0; i < list.length; i++){
      ctx.save();
      var graphic = list[i].graphic;
      for (var attribute in graphic){
        ctx[attribute] = graphic[attribute];
      }
      draw_key[name](list[i]);
      ctx.restore();
    }
    
  }

  function draw_circle(circle){
    ctx.beginPath();
    ctx.arc(circle.pos_x, circle.pos_y, circle.collision, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    if (circle.charge){
      draw_charge(circle);
    }
  }

  function draw_square(square){
    var x = square.pos_x;
    var y = square.pos_y;
    var size = square.size;
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x - size, y - size);
    ctx.fill();
    ctx.stroke();
  }

  function draw_charge(spot) {
    ctx.fillStyle = "rgba(212, 17, 27, 0.6)";
    ctx.shadowColor = '#d0161e';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(spot.pos_x, spot.pos_y, 4, 0, Math.PI * 2, true);
    // ctx.closePath();
    ctx.fill();
    // ctx.stroke();
  }

  function draw_paths() {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#d1f3f8';
    ctx.shadowColor = '#6FC3DF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    for (var i = 0; i < draw_manifest.paths.length; i++) {
      draw_path(draw_manifest.paths[i]);
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

  this.draw = draw;
  this.clear_level = clear_level;
  this.inject_avatar = inject_avatar;

  this.add_to_manifest = add_to_manifest;
  this.remove_from_manifest = remove_from_manifest;

};

// setup	
var canvas = document.getElementById("text");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var center = { x: 0, y: 0 };
var size = 12;
var colBg = 'rgba(240,240,240)';
var colGrid = 'rgba(0,20,40,0.9)';
var colSnake = 'rgba(0,255,255,0.1)';
var colSnake2 = 'rgba(0,100,100,0.1)';


/* /////
GRID
///// */

var bgcanv = document.createElement("canvas");
bgcanv.width = window.innerWidth;
bgcanv.height = window.innerHeight;
var bgcont = bgcanv.getContext('2d');
bgcont.translate(0.5, 0.5);
bgcont.fillStyle = colBg;
bgcont.fillRect(0, 0, bgcanv.width, bgcanv.height);

var nx = Math.ceil(bgcanv.height / size);
var ny = Math.ceil(bgcanv.width / size);
bgcont.strokeStyle = colGrid;

function line(x1, y1, x2, y2) {
  bgcont.beginPath();
  bgcont.moveTo(x1, y1);
  bgcont.lineTo(x2, y2);
  bgcont.closePath();
  bgcont.stroke();
}

for (var q = 1; q <= ny; q++) {
  line(q * size, 0, q * size, bgcanv.height);
}
for (var i = 0; i <= nx; i++) {
  line(0, i * size, bgcanv.width, i * size);
}
for (var i = 0; i <= (nx + ny); i++) {
  line(0, (i * size) - bgcanv.width, bgcanv.width, i * size);
  line(0, (i * size), bgcanv.width, (i * size) - bgcanv.width);
}

/* /////
SNAKE
///// */

var dirs = [
  { name: 'up', x: 0, y: -1 },
  { name: 'upright', x: 1, y: -1 },
  { name: 'right', x: 1, y: 0 },
  { name: 'downright', x: 1, y: 1 },
  { name: 'down', x: 0, y: 1 },
  { name: 'downleft', x: -1, y: 1 },
  { name: 'left', x: -1, y: 0 },
  { name: 'upleft', x: -1, y: -1 }
];

// init
function snake() {
  this.points = [{
    y: Math.floor((Math.random() * nx) + 1) * size,
    x: Math.floor((Math.random() * ny) + 1) * size
  }];
  this.draw = snakeDraw;
  this.move = snakeMove;
  this.dir = (Math.floor((Math.random() * 8) + 1));
}

// movement
function snakeMove() {
  var rand = (Math.floor((Math.random() * 3) - 1));
  var dir = this.dir + rand;
  if (dir < 0) { dir = 7; }
  if (7 < dir) { dir = 0; }
  var lpoint = this.points[this.points.length - 1];
  if (lpoint.x < 10) { dir = 2; }
  if (lpoint.y < 10) { dir = 4; }
  if (canvas.width - 10 < lpoint.x) { dir = 6; }
  if (canvas.height - 10 < lpoint.y) { dir = 0; }
  this.dir = dir;
  var npoint = { x: lpoint.x + (dirs[dir].x * size), y: lpoint.y + (dirs[dir].y * size) };
  this.points.push(npoint);
  if (10 < this.points.length) {
    this.points.shift();
  }
}

// draw
function snakeDraw() {
  var p = this.points;
  for (m = 1; m < p.length; m++) {
    ctx.beginPath();
    ctx.moveTo(p[m - 1].x, p[m - 1].y);
    ctx.lineTo(p[m].x, p[m].y);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = colSnake;
    ctx.stroke();
    ctx.lineWidth = 10;
    ctx.strokeStyle = colSnake2;
    ctx.stroke();
  }
}

// group of snakes
function snakes(n) {
  this.snakeys = [];
  for (var p = 0; p < n; p++) {
    this.snakeys.push(new snake());
  }
  this.go = snakesGo;
}
function snakesGo() {
  for (var r = 0; r < this.snakeys.length; r++) {
    this.snakeys[r].move();
    this.snakeys[r].draw();
  }
}


/* /////
FRAME
///// */

var sn = new snakes(10);
ctx.drawImage(bgcanv, 0, 0);
setInterval(function () {
  ctx.globalAlpha = 0.2;
  ctx.drawImage(bgcanv, 0, 0);
  ctx.globalAlpha = 1;
  sn.go();
}, 1000 / 30);
