import { useEffect, useState } from 'react';

import './App.css';
import { constants } from './app/config';
import { getDirection, getMoveStepPositions } from './app/game';
import { useStateValue } from './app/state/useStateValue';
import Dice from './components/dice/Dice';
import Grid from './components/grid/Grid';
import Legend from './components/legend/Legend';
import { arrayIsInArray, log, randomNumber } from './utils/main';

const App = () => {
  // hooks
  const [state, dispatch] = useStateValue();
  const [uiDisabled, setUIDisabled] = useState(false);
  const [isBootleTurn, setIsBottleTurn] = useState(false);

  // effects
  useEffect(() => {
    if (state.gameStatus.running && isBootleTurn) {
      onClickRollDiceHandler();
      setIsBottleTurn(false);
    }
  }, [state, isBootleTurn]);

  // eventHandlers
  const onClickStartGameHandler = e => {
    setUIDisabled(true);
    dispatch({
      type: 'START_GAME'
    });
    // give some time for bottle think its play and game state finish setup
    setTimeout(() => {
      setIsBottleTurn(true);
    }, constants.BOTTLE_THINK_INTERVAL);
  };

  const onClickStopGameHandler = e =>
    dispatch({
      type: 'STOP_GAME'
    });

  const onClickRollDiceHandler = e => {
    setUIDisabled(true);
    const roleDirectionStatus = randomNumber(1, 6);
    const roleStepsStatus = randomNumber(1, 6);
    const directionStatus = getDirection(
      state,
      state.gameStatus.directionStatus,
      roleDirectionStatus,
      roleStepsStatus
    );
    log(
      `roleDirectionStatus: ${roleDirectionStatus}, roleStepsStatus: ${roleStepsStatus}, directionStatus: ${directionStatus}`
    );

    // start rolling
    dispatch({
      type: 'ROLL_DICE',
      payload: {
        directionStatus,
        roleDirectionStatus,
        roleStepsStatus
      }
    });

    let moveTo;
    let dispatchType;
    if (state.gameStatus.turn === constants.PLAYER_ID) {
      moveTo = state.gameStatus.playerStatus.position;
      dispatchType = 'MOVE_PLAYER';
    } else {
      moveTo = state.gameStatus.bottleStatus.position;
      dispatchType = 'MOVE_BOTTLE';
    }

    // move steps
    let steps = 0;
    const interval = setInterval(() => {
      // log(`steps:${steps} === roleStepsStatus:${roleStepsStatus}`);
      if (steps === roleStepsStatus - 1) {
        dispatch({
          type: 'CHANGE_TURN',
          payload: {
            directionStatus,
            roleDirectionStatus,
            roleStepsStatus
          }
        });
        clearInterval(interval);
        // pass turn to bottle
        if (state.gameStatus.turn === constants.PLAYER_ID) {
          setIsBottleTurn(true);
        } else {
          setUIDisabled(false);
        }
      }

      // used as next position
      moveTo = getMoveStepPositions(
        moveTo,
        directionStatus,
        roleStepsStatus,
        state.gameStatus.columns,
        state.gameStatus.rows
      );

      // dispatch moveTo
      dispatch({
        type: dispatchType,
        payload: {
          position: moveTo
        }
      });

      // check player postions to define end of game
      let gameStop = false;
      let winner;

      if (state.gameStatus.turn === constants.PLAYER_ID) {
        const playerIsInGpgpArea = arrayIsInArray(
          state.gameStatus.gpgpAreaArray,
          moveTo
        );
        const playerIsOnTopOfBottle =
          moveTo[0] === state.gameStatus.bottleStatus.position[0] &&
          moveTo[1] === state.gameStatus.bottleStatus.position[1];
        log(
          `playerIsInGpgpArea: ${playerIsInGpgpArea}, playerIsOnTopOfBottle: ${playerIsOnTopOfBottle}`
        );
        if (playerIsInGpgpArea || playerIsOnTopOfBottle) {
          gameStop = true;
          winner = constants.PLAYER_ID;
        }
      } else {
        const bottleIsInGpgpArea = arrayIsInArray(
          state.gameStatus.gpgpAreaArray,
          moveTo
        );
        const bootleIsOnTopOfPlayer =
          moveTo[0] === state.gameStatus.playerStatus.position[0] &&
          moveTo[1] === state.gameStatus.playerStatus.position[1];
        log(
          `bottleIsInGpgpArea: ${bottleIsInGpgpArea}, bootleIsOnTopOfPlayer: ${bootleIsOnTopOfPlayer}`
        );
        if (bottleIsInGpgpArea) {
          gameStop = true;
          winner = constants.PLASTIC_BOTTLE_ID;
        }
        // player is a lucky one, bottle comes to it hands
        if (bootleIsOnTopOfPlayer) {
          gameStop = true;
          winner = constants.PLAYER_ID;
        }
      }

      if (gameStop) {
        dispatch({
          type: 'END_GAME',
          payload: {
            winner
          }
        });
        setUIDisabled(false);
        clearInterval(interval);
      }

      steps++;
    }, constants.STEPS_TIME_INTERVAL);
  };

  // debug helper
  const stateOutput = JSON.stringify(
    {
      ...state.gameStatus,
      gpgpAreaArray: undefined,
      pzAreaArray: undefined
    },
    undefined,
    2
  );
  let roundNo = 1;
  let turnPosition;
  if (state.gameStatus.running && constants.DEBUG) {
    if (state.gameStatus.rounds.length > 0) {
      roundNo = state.gameStatus.rounds.length + 1;
    }
    const turnKey =
      state.gameStatus.turn === constants.PLASTIC_BOTTLE_ID
        ? 'bottleStatus'
        : 'playerStatus';
    turnPosition = ` : C${state.gameStatus[turnKey].position[0] + 1}:R${state
      .gameStatus[turnKey].position[1] + 1} / ${
      state.gameStatus[turnKey].position[0]
    }
          :${state.gameStatus[turnKey].position[1]}`;
  }

  return (
    <div className='App'>
      <div className='gameTitle'>{constants.I18N.gameName}</div>
      <div className='toolbar'>
        {state.gameStatus.running ? (
          <>
            <button
              className='button'
              disabled={uiDisabled}
              onClick={onClickStopGameHandler}
            >
              {constants.I18N.stopGame}
            </button>
            <Dice
              direction={state.gameStatus.directionStatus[0]}
              label={constants.I18N.direction}
              value={state.gameStatus.roleDirectionStatus}
            />
            <Dice
              label={constants.I18N.steps}
              value={state.gameStatus.roleStepsStatus}
            />
            <button
              className='button'
              disabled={uiDisabled}
              onClick={onClickRollDiceHandler}
            >
              {constants.I18N.rollDice}
            </button>
            <div className='gameStatus'>
              {constants.I18N.turn} #{roundNo} : {state.gameStatus.turn}:{' '}
              {constants.I18N.currentPosition} {turnPosition}
            </div>
          </>
        ) : (
          <>
            <button
              className='button'
              disabled={uiDisabled}
              onClick={onClickStartGameHandler}
            >
              {constants.I18N.startGame}
            </button>
            {state.gameStatus.winner && (
              <div className='gameStatus'>
                {constants.I18N.winner} : {state.gameStatus.winner}:{' '}
                {constants.I18N.inXRounds.replace(
                  '%ROUNDS%',
                  state.gameStatus.rounds.length
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Grid />
      <Legend />
      {constants.DEBUG && <pre>state: {stateOutput}</pre>}
    </div>
  );
};

export default App;
