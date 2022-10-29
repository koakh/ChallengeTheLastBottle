export const constants = {
  DEBUG: true,
  SHOW_GRID_POSITION: false,
  USE_RANDOM_COLORS: false,
  MIN_GRID_SIZE: [10, 10],
  CELL_SIZE: [30, 30],
  PLAYER_ID: 'Henry',
  PLASTIC_BOTTLE_ID: 'Plastic Bottle',
  MAX_MARGIN: 20,
  // from center
  GPGP_MARGIN: 1,
  // from center, use 20 here to force entity random position collision
  // if greater that 21 creates eternal loop
  PROTECTED_ZONE_MARGIN: 4,
  DIRECTIONS: [
    ['N', 'S'],
    ['NE', 'SW'],
    ['E', 'W'],
    ['SE', 'NW'],
    ['S', 'N'],
    ['SW', 'NE'],
    ['W', 'E'],
    ['NW', 'SE']
  ],
  STEPS_TIME_INTERVAL: 500,
  BOTTLE_THINK_INTERVAL: 1000,
  COLORS: {
    gpgpArea: '#dd4444',
    pzArea: '#44aa66',
    oceanArea: '#4477ee',
    playerPositionCellArea: '#eedd56',
    bottlePositionCellArea: '#332211',
    startingCellArea: '#5667de',
    randomGpgpArea: [
      [220, 255],
      [40, 80],
      [80, 120]
    ],
    randomPzArea: [
      [40, 80],
      [220, 255],
      [80, 120]
    ],
    randomOceanArea: [
      [120, 140],
      [130, 150],
      [220, 255]
    ],
    randomPlayerPositionCellArea: [
      [220, 255],
      [220, 255],
      [80, 120]
    ],
    randomBottlePositionCellArea: [
      [10, 50],
      [10, 50],
      [10, 50]
    ],
    randomStartingCellArea: [
      [40, 80],
      [80, 120],
      [220, 255]
    ]
  },
  I18N: {
    gameName: 'The Last Bottle',
    direction: 'Direction',
    steps: 'Steps',
    rollDice: 'Roll dice',
    startGame: 'Start game',
    stopGame: 'Stop game',
    turn: 'Turn',
    currentPosition: 'Current position',
    winner: 'Winner',
    inXRounds: 'in %ROUNDS% round(s)'
  }
};
