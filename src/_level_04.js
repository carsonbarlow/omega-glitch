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

CONTENT.levels['4'] = {
  charges: 1,
  spots: {
    s1: {
      x: 9,
      y: 7,
      s: ['s2',0]
    },
    s2: {
      x: 10,
      y: 12,
      n: ['s1', 0],
      e: ['s3',1]
    },
    s3: {
      x: 14,
      y: 12,
      w: ['s2',1],
      e: ['s4',2],
      n: ['s7',5]
    },
    s4: {
      x: 22,
      y: 14,
      w: ['s3',2],
      e: ['s5',3],
      s: ['s6',4]
    },
    s5: {
      x: 25,
      y: 11,
      s: ['s4',3]
    },
    s6: {
      x: 20,
      y: 17,
      e: ['s4',4]
    },
    s7: {
      x: 20,
      y: 8,
      w: ['s3',5]
    }

  },
  paths: [
    ['s1',5,2,4,1,5,2],
    ['s2',3,4],
    ['s3',3,2,4,2,3,4],
    ['s4',3,2,2,1,1,2],
    ['s4',5,2,6,1,7,1],
    ['s3',1,2,2,2,3,4]
  ],
  start: 's1',
  objectives: ['s5'],
  patrols: [
    ['s6','s4','s3','s4']
  ]
};

