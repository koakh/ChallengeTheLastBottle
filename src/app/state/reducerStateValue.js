import { constants } from '../config'
import { generateGameData } from '../game'
import { initialState } from '../state/useStateValue'

export default (state, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      return {
        ...state,
        gameStatus: {
          ...state.gameStatus,
          playerStatus: {
            position: action.payload.position
          }
        }
      }
    case 'MOVE_BOTTLE':
      return {
        ...state,
        gameStatus: {
          ...state.gameStatus,
          bottleStatus: {
            position: action.payload.position
          }
        }
      }
    case 'SET_GRID':
      return {
        ...state,
        gameStatus: {
          ...state.gameStatus,
          ...action.payload
        }
      }
    case 'START_GAME':
      return {
        ...state,
        gameStatus: generateGameData(
          state.gameStatus.columns,
          state.gameStatus.rows
        )
      }
    case 'STOP_GAME':
      return {
        ...state,
        gameStatus: initialState.gameStatus
      }
    case 'ROLL_DICE':
      return {
        ...state,
        gameStatus: {
          ...state.gameStatus,
          ...action.payload
        }
      }
    case 'CHANGE_TURN':
      // eslint-disable-next-line no-case-declarations
      const turnKey =
        state.gameStatus.turn === constants.PLASTIC_BOTTLE_ID
          ? 'bottle'
          : 'player'
      // clone rounds
      // eslint-disable-next-line no-case-declarations
      const rounds = [...state.gameStatus.rounds]
      // const directionStatus = getDirection(state);
      rounds.push({
        player: state.gameStatus.turn,
        position: state.gameStatus[`${turnKey}Status`].position,
        dices: [
          state.gameStatus.roleDirectionStatus,
          state.gameStatus.roleStepsStatus
        ],
        direction: action.payload.directionStatus
      })
      return {
        ...state,
        gameStatus: {
          ...state.gameStatus,
          // directionStatus,
          turn:
            state.gameStatus.turn === constants.PLASTIC_BOTTLE_ID
              ? constants.PLAYER_ID
              : constants.PLASTIC_BOTTLE_ID,
          rounds,
          ...action.payload
        }
      }
    case 'END_GAME':
      return {
        ...state,
        gameStatus: {
          ...state.gameStatus,
          ...action.payload,
          running: false
        }
      }

    default:
      throw new Error('Unknown Action type!')
  }
}
