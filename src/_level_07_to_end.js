// level 1 content

// 1: north
// 2: north_east
// 3: east
// 4: south_east
// 5: south
// 6: south_west
// 7: west
// 8: north_west

var CONTENT = CONTENT || {levels:{}};

CONTENT.levels['7'] = ({charges:0,spots:{s1:{x:12,y:14,e:['s2',0]},s2:{x:19,y:14,n:['s5',3],e:['s3',1],w:['s1',0]},s3:{x:26,y:14,n:['s6',5],e:['s4',2],w:['s2',1]},s4:{x:32,y:14,n:['s7',6],w:['s3',2]},s5:{x:19,y:8,e:['s6',4],s:['s2',3]},s6:{x:25,y:8,s:['s3',5],w:['s5',4]},s7:{x:33,y:9,s:['s4',6],charge:true}},paths:[['s1',3,7],['s2',3,7],['s3',3,6],['s2',1,6],['s5',3,6],['s6',5,2,4,1,5,3],['s4',1,2,2,1,1,2]],patrols:[['s4','s3','s2','s3'],['s6','s3','s2','s5']],patrol_generators:[{s:'s4',p:[0,1]}],start:'s1',objectives:[['s6',[0,1,2,3,4,5]]],gates:[],gate_generators:[]});
CONTENT.levels['8'] = ({charges:0,spots:{s1:{x:5,y:22,n:['s2',0],w:['s4',2]},s2:{x:6,y:14,e:['s3',1],s:['s1',0],w:['s9',7]},s3:{x:14,y:16,e:['s10',8],w:['s2',1]},s4:{x:3,y:28,n:['s1',2],e:['s6',4]},s5:{x:14,y:24,e:['s10',10],w:['s1',3]},s6:{x:6,y:28,w:['s4',4],charge:true},s7:{x:9,y:10,e:['s8',5],w:['s2',6],charge:true},s8:{x:19,y:11,e:['s10',9],w:['s7',5]},s9:{x:2,y:10,s:['s2',7]},s10:{x:21,y:15,n:['s8',9],s:['s5',10],w:['s3',8]}},paths:[['s1',1,4,2,1,1,3],['s2',3,3,4,2,3,3],['s1',7,1,6,1,5,5],['s5',7,3,8,1,7,4,8,1],['s4',3,3],['s7',3,5,4,1,3,4],['s7',7,1,6,1,5,2,6,1],['s2',7,2,8,2,1,2],['s3',3,3,2,1,3,3],['s10',1,4,7,2],['s10',5,6,6,1,5,2,7,6]],patrols:[['s2','s3','s10','s8','s7'],['s10','s8','s7','s2','s3']],patrol_generators:[{s:'s9',p:[0,1]}],start:'s1',objectives:[['s4',[0,1,2,3,4,5,6,7,8,9,10]]],gates:[{x:3,y:26}],gate_generators:[{s:'s5',g:[0],gp:[[6,2,7,9]]}]});