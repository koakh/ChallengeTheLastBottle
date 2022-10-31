import { log, arrayIsInArray, randomPosition } from '../utils/main'

import { constants } from './config'

export const generateGameData = (columns, rows) => {
  // protect from invalid hacked configurations
  if (
    constants.GPGP_MARGIN > constants.MAX_MARGIN ||
    constants.PROTECTED_ZONE_MARGIN > constants.MAX_MARGIN
  ) {
    log(
      `error invalid configuration data detected on margin, one of the margins exceed max value of ${constants.MAX_MARGIN}`,
      'error'
    )
    return { running: false }
  }
  const gpgpCenterPosition = randomPosition(columns, rows - 1)
  const gpgpArea = calcArea(gpgpCenterPosition, constants.GPGP_MARGIN)
  const pzArea = calcArea(gpgpCenterPosition, constants.PROTECTED_ZONE_MARGIN)
  const gpgpAreaArray = getAreaArray(gpgpArea, columns, rows)
  const pzAreaArray = getAreaArray(pzArea, columns, rows)

  const bottlePosition = getEntityRandomPosition(columns, rows, pzAreaArray)
  // push bottlePosition
  const playerPosition = getEntityRandomPosition(
    columns,
    rows,
    // push bottlePosition, player can't start in same position
    [...pzAreaArray, bottlePosition]
  )

  // state.gameStatus
  return {
    running: true,
    winner: undefined,
    // start undefined, we need to generate game data first, and fire FIRST_TURN after to prevent first round side effects
    turn: undefined,
    startingPosition: playerPosition,
    playerStatus: {
      position: playerPosition
    },
    bottleStatus: {
      position: bottlePosition
    },
    directionStatus: constants.DIRECTIONS[0],
    rounds: [],
    rows: 0,
    columns: 0,
    gpgpCenterPosition,
    gpgpAreaArray,
    pzAreaArray
  }
}

export const calcArea = (center, margin) => {
  return {
    topLft: [center[0] - margin, center[1] - margin],
    topRgt: [center[0] + margin, center[1] - margin],
    botRgt: [center[0] + margin, center[1] + margin],
    botLft: [center[0] - margin, center[1] + margin]
  }
}

export const getAreaArray = (area, columns, rows) => {
  const areaArray = []
  const { topLft, topRgt, botRgt, botLft } = area
  const top = topLft[1]
  const bot = botRgt[1] + 1
  const lft = botLft[0]
  const rgt = topRgt[0] + 1

  for (let col = top; col < bot; col++) {
    for (let row = lft; row < rgt; row++) {
      let finalRow = row
      let finalCol = col
      // work with overflow negative
      if (row < 0) {
        finalRow = columns + row
      }
      if (col < 0) {
        finalCol = rows + col
      }
      // work with overflow positive
      if (col > rows - 1) {
        finalCol = col - rows
      }
      if (row > columns - 1) {
        finalRow = row - columns
      }
      // log(`col:${col}:${finalCol} x row:${row}:${finalRow}`);
      areaArray.push([finalRow, finalCol])
    }
  }
  return areaArray
}

const getEntityRandomPosition = (cols, rows, collisionArray) => {
  /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
  while (true) {
    const suggested = randomPosition(cols, rows)
    if (!arrayIsInArray(collisionArray, suggested)) {
      return suggested
    }
  }
}

/**
 * get direction player from current state
 * @param {*} state
 * @returns directionStatus array
 */
export const getDirection = (state, directionStatus, roleDirectionStatus) => {
  const debug = false

  const outAvailableDirections = availableDirections =>
    log(
      `availableDirections: ${JSON.stringify(
        availableDirections.map(e => e[0]),
        undefined,
        2
      )}`
    )

  // start without any round
  if (state.gameStatus.rounds.length === 0) {
    const availableDirections = constants.DIRECTIONS.slice(0, 6)
    if (debug) outAvailableDirections(availableDirections)
    return availableDirections[roleDirectionStatus - 1]
  } else {
    const availableDirections = constants.DIRECTIONS.filter(
      e => e[0] !== directionStatus[0] && e[0] !== directionStatus[1]
    )
    if (debug) outAvailableDirections(availableDirections)
    return availableDirections[roleDirectionStatus - 1]
  }
}

export const getNextMovePosition = (
  position,
  directionStatus,
  columns,
  rows
) => {
  let result = position
  switch (directionStatus[0]) {
    case 'N':
      result = [position[0], position[1] - 1]
      break
    case 'NE':
      result = [position[0] + 1, position[1] - 1]
      break
    case 'E':
      result = [position[0] + 1, position[1]]
      break
    case 'SE':
      result = [position[0] + 1, position[1] + 1]
      break
    case 'S':
      result = [position[0], position[1] + 1]
      break
    case 'SW':
      result = [position[0] - 1, position[1] + 1]
      break
    case 'W':
      result = [position[0] - 1, position[1]]
      break
    case 'NW':
      result = [position[0] - 1, position[1] - 1]
      break
    default:
      break
  }
  // top limit
  if (result[1] < 0) {
    result = [result[0], rows + result[1]]
  }
  // left limit
  if (result[0] < 0) {
    result = [columns + result[0], result[1]]
  }
  // bottom limit
  if (result[1] > rows - 1) {
    result = [result[0], 0]
  }
  // rigth limit
  if (result[0] > columns - 1) {
    result = [0, result[1]]
  }
  return result
}

/**
 * get player move step position from state
 * @param {*} currentPos
 * @param {*} state
 * @returns
 */
export const getMoveStepPositions = (
  position,
  directionStatus,
  roleStepsStatus,
  columns,
  rows
) => {
  const debug = false
  if (debug) {
    log(
      `move ${roleStepsStatus} step(s) to direction ${directionStatus[0]} from current ${position} position`
    )
  }
  const nextPosition = getNextMovePosition(
    position,
    directionStatus,
    columns,
    rows
  )

  if (debug) log(`nextPosition: [${nextPosition}]`)
  return nextPosition
}
