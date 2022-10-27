import './Row.css';

import Cell from '../cell/Cell';

export default function Row ({ columnId, columns }) {
  return (
    <div className='row'>
      {[...Array(columns + 1).keys()].map((e, i) => (
        <div key={i}>
          {i === 0 ? (
            `R${columnId + 1}`
          ) : (
            <Cell key={i} position={[e - 1, columnId]} />
          )}
        </div>
      ))}
    </div>
  );
}
