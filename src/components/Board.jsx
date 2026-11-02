import Cell from './Cell.jsx'

export default function Board({ cells, winningLine, disabled, onCellClick }) {
  return (
    <div className="board">
      {cells.map((value, index) => (
        <Cell
          key={index}
          value={value}
          isWinning={winningLine.includes(index)}
          disabled={disabled || value !== null}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  )
}