Invalid or incomplete commands
---------------------------------

- these commands should not do anything and provide appropriate error info to user

    blank (just press enter)
    random
    MOVE me
    LEFT 1
    getREPORT
    PLACE
    PLACE 1, 1
    PLACE a, b, NORTH
    PLACE 1, 2, NORTH, something
    PLACE 20, 1, NORTH
    PLACE -2, 1, NORTH
    PLACE 2.5, 1, NORTH
    PLACE 1, 20, NORTH
    PLACE  1, -2, NORTH
    PLACE 1, 2.5, NORTH
    PLACE 1, 2, anythiing


valid commands
---------------------------------

- these commands are example of valid structure (accepts case insansitive and user inputs are trimmed)

    place 1, 2, NOrTh
    move
    PLACE 1, 2,NORTH
    MOVE
    LEFT
    RiGHT
    REPORT


Test cases
---------------------------------

- these are some test scenarios

  MOVE
  REPORT ----- nothing, should show appropriate message


  PLACE 1,2,NORTH
  REPORT ----- 1, 2, NORTH


  PLACE 2, 2, NORTH
  MOVE
  LEFT
  MOVE
  LEFT
  MOVE
  REPORT ----- 2, 2, EAST


  PLACE 1, 2, NORTH
  LEFT
  REPORT ----- 1, 2, WEST


  PLACE 1, 2, NORTH
  RIGHT
  REPORT ----- 1, 2, EAST


  PLACE 0, 0, NORTH
  LEFT
  LEFT
  LEFT
  LEFT
  REPORT ----- 0, 0, NORTH


  PLACE 0, 0, NORTH
  RIGHT
  RIGHT
  RIGHT
  RIGHT
  REPORT ----- 0, 0, NORTH


  PLACE 0, 0, WEST
  MOVE
  REPORT ----- 0, 0, WEST


  PLACE 0, 0, SOUTH
  MOVE
  REPORT ----- 0, 0, SOUTH


  PLACE 5, 0, EAST
  MOVE
  REPORT ----- 5, 0, EAST


  PLACE 5, 0, SOUTH
  MOVE
  REPORT ----- 5, 0, SOUTH


  PLACE  0, 5, WEST
  MOVE
  REPORT ----- 0, 5, WEST


  PLACE 0, 5, NORTH
  MOVE
  REPORT ----- 0, 5, NORTH


  PLACE  5, 5, EAST
  MOVE
  REPORT ----- 5, 5, EAST


  PLACE 5, 5, NORTH
  MOVE
  REPORT ----- 5, 5, NORTH


  PLACE 1, 2, NORTH
  LEFT
  PLACE 1, 2, NORTH
  RIGHT
  REPORT ----- 1, 2, EAST
