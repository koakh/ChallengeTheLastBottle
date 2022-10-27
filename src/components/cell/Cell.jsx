import './Cell.css';

import { constants } from '../../app/config';
import { useStateValue } from '../../app/state/useStateValue';
import { arrayIsInArray, generateRandomRgbColor } from '../../utils/main';
import player1 from '../../assets/player-1.svg';
import bottle2 from '../../assets/bottle-2.svg';

export default function Cell ({ position }) {
  const [x, y] = position;
  const [state] = useStateValue();

  const drawThing = (x, y, player, bottle, showPos = false) => {
    if (x === player[0] && y === player[1])
      return <img alt='player' className='thing' src={player1} />;
    if (x === bottle[0] && y === bottle[1])
      return <img alt='bottle' className='thing' src={bottle2} />;
    if (showPos) return `${x}:${y}`;
    // return <img alt='player' className='wave' src={wave} stroke='green' />;
  };

  const drawBack = (x, y) => {
    const [gpgpR, gpgpG, gpgpB] = constants.COLORS.randomGpgpArea;
    const [pzR, pzG, pzB] = constants.COLORS.randomPzArea;
    const [oceanR, oceanG, oceanB] = constants.COLORS.randomOceanArea;
    const [
      playerPosR,
      playerPosG,
      playerPosB
    ] = constants.COLORS.randomPlayerPositionCellArea;
    const [
      bottlePosR,
      bottlePosG,
      bottlePosB
    ] = constants.COLORS.randomBottlePositionCellArea;
    const [
      startPosR,
      startPosG,
      startPosB
    ] = constants.COLORS.randomStartingCellArea;

    // player
    if (
      state.gameStatus.gpgpAreaArray &&
      arrayIsInArray(state.gameStatus.gpgpAreaArray, [x, y])
    ) {
      return generateRandomRgbColor(gpgpR, gpgpG, gpgpB);
    }
    // protectedZone
    if (
      state.gameStatus.pzAreaArray &&
      arrayIsInArray(state.gameStatus.pzAreaArray, [x, y])
    ) {
      return generateRandomRgbColor(pzR, pzG, pzB);
    }
    // playerPosition, before startingPosition, player always overlap startingPosition
    if (
      state.gameStatus.playerStatus &&
      state.gameStatus.playerStatus.position &&
      state.gameStatus.playerStatus.position[0] === x &&
      state.gameStatus.playerStatus.position[1] === y
    ) {
      return generateRandomRgbColor(playerPosR, playerPosG, playerPosB);
    }
    // bottlePosition, before startingPosition, bottle always overlap startingPosition
    if (
      state.gameStatus.bottleStatus &&
      state.gameStatus.bottleStatus.position &&
      state.gameStatus.bottleStatus.position[0] === x &&
      state.gameStatus.bottleStatus.position[1] === y
    ) {
      return generateRandomRgbColor(bottlePosR, bottlePosG, bottlePosB);
    }
    // startingPosition
    if (
      state.gameStatus.startingPosition &&
      state.gameStatus.startingPosition[0] === x &&
      state.gameStatus.startingPosition[1] === y
    ) {
      return generateRandomRgbColor(startPosR, startPosG, startPosB);
    }

    // ocean
    return generateRandomRgbColor(oceanR, oceanG, oceanB);
  };

  return (
    <div
      className='cell'
      style={{
        backgroundColor: drawBack(x, y)
      }}
    >
      {(state.gameStatus.running || state.gameStatus.winner) &&
        drawThing(
          x,
          y,
          state.gameStatus.playerStatus.position,
          state.gameStatus.bottleStatus.position,
          constants.SHOW_GRID_POSITION
        )}
    </div>
  );
}
