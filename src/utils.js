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

  function stringify_level(level){
    var directions = ['n','e','s','w'];
    var response = '({charges:';
    response += level.charges + ','
    response += 'spots:{';
    for (var s in level.spots){
      var spot = level.spots[s];
      response += s + ':{x:'+spot.x+',y:'+spot.y
      for (var dir = 0; dir < directions.length; dir++){
        if (typeof spot[directions[dir]] != 'undefined'){
          response += ','+directions[dir]+':[\''+spot[directions[dir]][0]+'\','+spot[directions[dir]][1]+']';
        }
      }
      if (spot.charge){
        response += ',charge:true'
      }
      response += '},'
    }
    response = response.substr(0,response.length-1);
    // paths
    response += '},paths:[';
    for (var p = 0; p < level.paths.length; p++){
      response += '[\''+level.paths[p][0]+'\','+level.paths[p].splice(1).toString()+'],'
    }
    response = response.substr(0,response.length-1);
    // patrols: [],
    response += '],patrols:[';
    // patrol_generators: [],
    response += '],patrol_generators:[';
    // start: 's1',
    response += '],start:\''+level.start+'\',';
    // objectives: [['s3',[0,1]]],
    response += 'objectives:[';
    for (var o = 0; o < level.objectives.length; o++){
      response += '[\''+level.objectives[o][0]+'\',['+level.objectives[o][1].toString()+']],'
    }
    response = response.substr(0,response.length-1);
    // gates: [],
    response += '],gates:[';
    // gate_generators: [],
    response += '],gate_generators:[';
    response += ']});'
    return response;
  }

  this.normalize = normalize;
  this.check_collision = check_collision;
  this.stringify_level = stringify_level;

};

utils = new Utils();



// ({
//   charges:0,
//   spots:{
//     s1:{
//       x:7,
//       y:15,
//       e:['s2',0]
//     },
//     s2:{
//       x:11,
//       y:15,
//       e:['s3',1],
//       w:['s1',0]
//     },
//     s3:{
//       x:15,
//       y:15,
//       w:['s2',1]
//     }
//   },
//   paths:[
//     ['s1',3,4],
//     ['s2',3,4]
//   ],
//   patrols:[],
//   patrol_generators:[],
//   start:'s1',
//   objectives:[
//     ['s1',[0],
//     ['s3',[1]
//   ],
//   gates:[],
//   gate_generators[]
// })

// charges: 1,
//   spots: {
//     s1: {
//       x: 8,
//       y: 15,
//       e: ['s2',0]
//     },
//     s2: {
//       x: 20,
//       y: 15,
//       w: ['s1',0],
//       e: ['s3',1]
//     },
//     s3: {
//       x: 35,
//       y: 15,
//       w: ['s2',1]
//     }
//   },
//   paths: [
//     ['s1',3,12],
//     ['s2',3,15]
//     // ['s2',3,3,4,2,5,3,7,2,5,2,3,1,2,3,5,2,3,2,2,1,1,2,8,1,7,2,8,1,1,2,2,2,3,4,4,1,5,1,4,1,3,1]
//   ],
//   patrols: [],
//   patrol_generators: [],
//   start: 's1',
//   objectives: [['s3',[0,1]]],
//   gates: [],
//   gate_generators: [],
//   tips: [
//     {
//       x: 20,
//       y: 140,
//       t: 'lv1a'
//     },
//     {
//       x: 420,
//       y: 110,
//       t: 'lv1b'
//     }
//   ]
// };