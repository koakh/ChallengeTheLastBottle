import './Legend.css';
import player1 from '../../assets/player-1.svg';
import bottle2 from '../../assets/bottle-2.svg';

export default function Legend () {
  return (
    <div className='legendContainer'>
      <div className='legend'>
        <div className='legendTitle'>Legend:</div>
        <div className='legendRow'>
          <div className='col0'>
            <img alt='player' className='thing' src={player1} />
          </div>
          <div className='col1'>You</div>
          <div className='col0'>
            <div className='pz' />
          </div>
          <div className='col2'>Protected Zone</div>
          <div className='col34'>N - North</div>
          <div className='col34'>E - East</div>
          <div className='col56'>NE - Northeast</div>
          <div className='col56'>NW - Northwest</div>
        </div>
        <div className='legendRow'>
          <div className='col0'>
            <img alt='player' className='thing' src={bottle2} />
          </div>
          <div className='col1'>The Bottle</div>
          <div className='col0'>
            <div className='gpgp' />
          </div>
          <div className='col2'>GPgp - Great Pacific garbage patch</div>
          <div className='col34'>S - South</div>
          <div className='col34'>W - West</div>
          <div className='col56'>SE - Southeast</div>
          <div className='col56'>SW - Southwest</div>
        </div>
      </div>
    </div>
  );
}
