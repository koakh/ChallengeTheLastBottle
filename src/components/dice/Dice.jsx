import { constants } from '../../app/config';
import dice1 from '../../assets/dice-1.svg';
import dice2 from '../../assets/dice-2.svg';
import dice3 from '../../assets/dice-3.svg';
import dice4 from '../../assets/dice-4.svg';
import dice5 from '../../assets/dice-5.svg';
import dice6 from '../../assets/dice-6.svg';
import './Dice.css';

export default function Dice ({ label, value, direction }) {
  let diceImg;
  switch (value) {
    case 1:
      diceImg = dice1;
      break;
    case 2:
      diceImg = dice2;
      break;
    case 3:
      diceImg = dice3;
      break;
    case 4:
      diceImg = dice4;
      break;
    case 5:
      diceImg = dice5;
      break;
    case 6:
      diceImg = dice6;
      break;
    default:
      diceImg = dice1;
      break;
  }
  return (
    <div
      className={`diceContainer ${
        label === constants.I18N.direction ? 'diceDirection' : 'diceSteps'
      }`}
    >
      <div className='diceContainerLabel'>{label}</div>
      <div>
        <img alt='dice' className='dice' src={diceImg} />
      </div>
      {direction && (
        <div className='diceContainerLabel' style={{ width: '1.75em' }}>
          {direction}
        </div>
      )}
    </div>
  );
}
