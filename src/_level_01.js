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

CONTENT.levels['1'] = {
  charges: 1,
  spots: {
    s1: {
      x: 8,
      y: 15,
      e: ['s2',0]
    },
    s2: {
      x: 20,
      y: 15,
      w: [0,0],
      e: ['s3',1]
    },
    s3: {
      x: 35,
      y: 15,
      w: ['s2',1]
    }
  },
  paths: [
    ['s1',3,12],
    ['s2',3,15]
    // ['s2',3,3,4,2,5,3,7,2,5,2,3,1,2,3,5,2,3,2,2,1,1,2,8,1,7,2,8,1,1,2,2,2,3,4,4,1,5,1,4,1,3,1]
  ],
  patrols: [],
  start: 's1',
  objectives: ['s3']
};

