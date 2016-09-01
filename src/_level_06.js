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

CONTENT.levels['6'] = {
  charges: 1,
  spots: {
    s1: {
      x: 28,
      y: 18,
      n: ['s2',0]
    },
    s2: {
      x: 20,
      y: 14,
      e: ['s1',0],
      s: ['s3',1]
    },
    s3: {
      x: 8,
      y: 18,
      n: ['s2',1],
      w: ['s4',2]
    },
    s4: {
      x: 4,
      y: 10,
      s: ['s3',2],
      n: ['s5',3]
    },
    s5: {
      x: 9,
      y: 4,
      w: ['s4',3],
      e: ['s6',4]
    },
    s6: {
      x: 15,
      y: 4,
      w: ['s5',4],
      n: ['s7',5]
    },
    s7: {
      x: 22,
      y: 1,
      w: ['s6',5],
      s: ['s8',6]
    },
    s8: {
      x: 19,
      y: 8,
      e: ['s7',6]
    }
  },
  paths: [
    ['s1',1,2,8,2,7,6],
    ['s2',5,3,6,2,8,2,1,3,7,6,6,2,5,2],
    ['s3',7,2,8,2,1,6],
    ['s4',1,3,2,3,3,2],
    ['s5',3,6],
    ['s6',1,2,2,1,3,6],
    ['s7',5,6,6,1,7,2]
  ],
  start: 's1',
  objectives: ['s4','s7'],
  patrols: [
    // ['s5','s4','s7','s6']
  ],
  patrol_generators: [

  ],
  gates: [
    
  ],
  gate_generators: [
    
  ]
};