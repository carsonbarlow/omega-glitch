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

CONTENT.levels['7'] = {
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
      e: ['s3',1]
    }
  },
  paths: [],
  patrols: [],
  patrol_generators: [],
  start: 's1',
  objectives: [],
  gates: [],
  gate_generators: []
};