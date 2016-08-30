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

CONTENT.levels['2'] = {
  charges: 0,
  spots: {
    s1: {
      x: 8,
      y: 15,
      e: ['s2',0]
    },
    s2: {
      x: 20,
      y: 15,
      w: ['s1',0],
      e: ['s3',1],
      n: ['s4',2]
    },
    s3: {
      x: 35,
      y: 15,
      w: ['s2',1],
      charge: true
    },
    s4: {
      x: 20,
      y: 10,
      s: ['s2',2]
    }
  },
  paths: [
    ['s1',3,12],
    ['s2',3,15],
    ['s2',1,5]
  ],
  patrols: [],
  start: 's1',
  objectives: ['s4']
};

