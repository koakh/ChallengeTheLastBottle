import { useRef, useCallback, useEffect, useState } from 'react'

import { useStateValue } from '../../app/state/useStateValue'
import { constants } from '../../app/config'
import Row from '../row/Row'
import './Grid.css'

export default function Grid () {
  const [state, dispatch] = useStateValue()
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)
  const debounceTimer = useRef()
  const running = state.gameStatus.running

  const renderGrid = () => {
    const removeHeight = 250
    const removeWidth = 20
    const columns =
      Math.floor((window.innerWidth - removeWidth) / constants.CELL_SIZE[0]) - 1
    const rows =
      Math.floor((window.innerHeight - removeHeight) / constants.CELL_SIZE[1]) -
      1
    setColumns(
      columns < constants.MIN_GRID_SIZE[0]
        ? constants.MIN_GRID_SIZE[0]
        : columns
    )
    setRows(
      rows < constants.MIN_GRID_SIZE[1] ? constants.MIN_GRID_SIZE[1] : rows
    )
    dispatch({
      type: 'SET_GRID',
      payload: {
        columns,
        rows
      }
    })
  }

  useEffect(() => {
    const resizeHandler = () => {
      // block change while running
      if (running) {
        return
      }
      renderGrid()
    }

    const debounce = callback => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(callback, 250)
    }

    // initial render grid
    renderGrid()

    window.addEventListener('resize', () => debounce(resizeHandler))
    return () => {
      window.removeEventListener('resize', () => debounce(resizeHandler))
    }
  }, [running])

  return (
    <div className='grid'>
      <div className='columnLabel'>
        {columns > 0 &&
          Array.from(Array(columns + 1), (_, i) => (
            <div key={i}>{i > 0 ? `C${i}` : ''}</div>
          ))}
      </div>

      {rows > 0 &&
        Array.from(Array(rows), (_, i) => (
          <Row key={i} columnId={i} columns={columns}>
            Row {i + 1}
          </Row>
        ))}
    </div>
  )
}
