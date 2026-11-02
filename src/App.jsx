import { useState } from 'react'
import Board from './components/Board.jsx'
import GameStatus from './components/GameStatus.jsx'
import { getResult } from './game.js'

const STORAGE_KEY = 'tic-tac-toe-score'
const emptyScore = { X: 0, O: 0, draws: 0 }

function loadScore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...emptyScore, ...JSON.parse(raw) } : emptyScore
  } catch {
    return emptyScore
  }
}

function saveScore(score) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score))
  } catch {
    return
  }
}

export default function App() {
  const [cells, setCells] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [score, setScore] = useState(loadScore)

  const { winner, line, isDraw } = getResult(cells)
  const isGameOver = winner !== null || isDraw

  function updateScore(nextScore) {
    setScore(nextScore)
    saveScore(nextScore)
  }

  function handleCellClick(index) {
    if (cells[index] !== null || isGameOver) return

    const nextCells = [...cells]
    nextCells[index] = currentPlayer
    setCells(nextCells)

    const nextResult = getResult(nextCells)
    if (nextResult.winner) {
      updateScore({ ...score, [nextResult.winner]: score[nextResult.winner] + 1 })
    } else if (nextResult.isDraw) {
      updateScore({ ...score, draws: score.draws + 1 })
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  function handleNewGame() {
    setCells(Array(9).fill(null))
    setCurrentPlayer('X')
  }

  function handleResetScore() {
    updateScore(emptyScore)
  }

  return (
    <main className="app">
      <h1 className="title">Хрестики-нулики</h1>

      <section className="scoreboard">
        <div className="score score-x">
          <span className="score-label">X</span>
          <span className="score-value">{score.X}</span>
        </div>
        <div className="score score-draw">
          <span className="score-label">Нічиї</span>
          <span className="score-value">{score.draws}</span>
        </div>
        <div className="score score-o">
          <span className="score-label">O</span>
          <span className="score-value">{score.O}</span>
        </div>
      </section>

      <GameStatus
        currentPlayer={currentPlayer}
        winner={winner}
        isDraw={isDraw}
      />

      <Board
        cells={cells}
        winningLine={line}
        disabled={isGameOver}
        onCellClick={handleCellClick}
      />

      <div className="actions">
        <button className="button primary" onClick={handleNewGame}>
          Нова гра
        </button>
        <button className="button ghost" onClick={handleResetScore}>
          Скинути рахунок
        </button>
      </div>
    </main>
  )
}
