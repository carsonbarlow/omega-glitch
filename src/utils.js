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
      response += '[\''+level.paths[p][0]+'\','+level.paths[p].slice(0).splice(1).toString()+'],'
    }
    response = response.substr(0,response.length-1);
    // patrols: [],
    response += '],patrols:[';
    for (var p = 0; p < level.patrols.length; p++){
      response += '['
      for (var route = 0; route < level.patrols[p].length; route++){
        response += '\''+level.patrols[p][route]+'\',';
      }
      response = response.substr(0,response.length-1);
      response += '],';
    }
    if (response[response.length-1] == ','){
      response = response.substr(0,response.length-1);
    }
    // patrol_generators: [],
    response += '],patrol_generators:[';
    for (var pg = 0; pg < level.patrol_generators.length; pg++){
      response += '{s:\''+level.patrol_generators[pg].s+'\',p:['+level.patrol_generators[pg].p.slice(0).toString()+']},'
    }
    if (response[response.length-1] == ','){
      response = response.substr(0,response.length-1);
    }
    // start: 's1',
    response += '],start:\''+level.start+'\',';
    // objectives: [['s3',[0,1]]],
    response += 'objectives:[';
    for (var o = 0; o < level.objectives.length; o++){
      response += '[\''+level.objectives[o][0]+'\',['+level.objectives[o][1].toString()+']],'
    }
    if (response[response.length-1] == ','){
      response = response.substr(0,response.length-1);
    }
    // gates: [],
    response += '],gates:[';
    for (var g = 0; g < level.gates.length; g++){
      response += '{x:'+level.gates[g].x+',y:'+level.gates[g].y+'},';
    }
    if (response[response.length-1] == ','){
      response = response.substr(0,response.length-1);
    }
    // gate_generators: [],
    response += '],gate_generators:[';
    for (var gg = 0; gg < level.gate_generators.length; gg++){
      response += '{s:\''+level.gate_generators[gg].s+'\',g:['+level.gate_generators[gg].g.toString()+'],gp:[';
      for (var gp = 0; gp < level.gate_generators[gg].gp.length; gp++){
        response += '['+level.gate_generators[gg].gp[gp].toString()+'],';
      }
      if (response[response.length-1] == ','){
        response = response.substr(0,response.length-1);
      }
      response += ']},';
    }
    if (response[response.length-1] == ','){
      response = response.substr(0,response.length-1);
    }
    response += ']});'
    return response;
  }

  this.normalize = normalize;
  this.check_collision = check_collision;
  this.stringify_level = stringify_level;

};

utils = new Utils();

