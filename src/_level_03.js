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

CONTENT.levels['3'] = {
  charges: 1,
  spots: {
    s1: {
      x: 8,
      y: 15,
      e: ['s2',0]
    },
    s2: {
      x: 12,
      y: 15,
      w: ['s1',0],
      e: ['s4',1],
      n: ['s3',2],
    },
    s3: {
      x: 12,
      y: 10,
      s: ['s2',2]
    },
    s4: {
      x: 16,
      y: 15,
      w: ['s2',1],
      e: ['s5',3]
    },
    s5: {
      x: 20,
      y: 15,
      w: ['s4',3],
      e: ['s6',4]
    },
    s6: {
      x: 24,
      y: 15,
      w: ['s5',4],
      e: ['s7',5],
      s: ['s8',6]
    },
    s7: {
      x: 30,
      y: 11,
      s: ['s6',5]
    },
    s8: {
      x: 30,
      y: 19,
      w: ['s6',6]
    }
  },
  paths: [
    ['s1',3,4],
    ['s2',3,4],
    ['s2',1,5],
    ['s4',3,4],
    ['s5',3,4],
    ['s6',3,3,2,3,1,1],
    ['s6',5,2,4,2,3,4]
  ],
  start: 's1',
  objectives: ['s7'],
  patrols: [
    ['s3','s2','s4','s5','s6','s8','s6','s5','s4','s2']
  ],
  gates: [],
  gate_generators: []
};

