import { useCallback, useEffect, useState } from 'react';

import { useStateValue } from '../../app/state/useStateValue';
import { constants } from '../../app/config';
import Row from '../row/Row';
import './Grid.css';

export default function Grid () {
  const [state, dispatch] = useStateValue();
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const running = state.gameStatus.running;

  const renderGrid = () => {
    const removeHeight = 124;
    const removeWidth = 10;
    const columns =
      Math.floor((window.innerWidth - removeWidth) / constants.CELL_SIZE[0]) -
      1;
    const rows =
      Math.floor((window.innerHeight - removeHeight) / constants.CELL_SIZE[1]) -
      1;
    setColumns(
      columns < constants.MIN_GRID_SIZE[0]
        ? constants.MIN_GRID_SIZE[0]
        : columns
    );
    setRows(
      rows < constants.MIN_GRID_SIZE[1] ? constants.MIN_GRID_SIZE[1] : rows
    );
    dispatch({
      type: 'SET_GRID',
      payload: {
        columns,
        rows
      }
    });
  };

  const resizeHandler = useCallback(() => {
    // block change while running
    if (running) {
      return;
    }

    renderGrid();
  }, [running]);

  useEffect(() => {
    renderGrid();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <div className='grid'>
      <div className='columnLabel'>
        {columns > 0 &&
          [...Array(columns + 1).keys()].map((e, i) => (
            <div key={i}>{i > 0 ? `C${e}` : ''}</div>
          ))}
      </div>

      {rows > 0 &&
        [...Array(rows).keys()].map((e, i) => (
          <Row key={i} columnId={i} columns={columns}>
            Row {e + 1}
          </Row>
        ))}
    </div>
  );
}
