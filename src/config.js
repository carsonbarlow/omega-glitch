// global configuration

var CONFIG = {
  canvas_id: 'game_canvas',
  fps: 60,
  grid_width: 40,
  grid_height: 30,
  grid_size: 15,
  direction_to_grid_difference: {
    '1': {x: 0, y: -1},  // north
    '2': {x: 1, y: -1},  // north_east
    '3': {x: 1, y:0},  // east
    '4': {x:1 , y:1},  // south_east
    '5': {x:0 , y:1},  // south
    '6': {x:-1 , y:1},  // south_west
    '7': {x:-1 , y:0},  // west
    '8': {x:-1 , y:-1},  // north_west
  },
  level_button_width: 5

}