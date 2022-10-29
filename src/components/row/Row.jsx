import './Row.css';

import Cell from '../cell/Cell';

export default function Row ({ columnId, columns }) {
  return (
    <div className='row'>
      {Array.from(Array(columns + 1), (_, i) => (
        <div key={i}>
          {i === 0 ? (
            `R${columnId + 1}`
          ) : (
            <Cell key={i} position={[i - 1, columnId]} />
          )}
        </div>
      ))}
    </div>
  );
}
