export default function GameStatus({ currentPlayer, winner, isDraw }) {
  let content
  let tone = 'neutral'

  if (winner) {
    content = (
      <>Переміг гравець <strong className={`mark mark-${winner.toLowerCase()}`}>{winner}</strong>!</>
    )
    tone = 'win'
  } else if (isDraw) {
    content = 'Нічия'
    tone = 'draw'
  } else {
    content = (
      <>Зараз ходить <strong className={`mark mark-${currentPlayer.toLowerCase()}`}>{currentPlayer}</strong></>
    )
  }

  return (
    <p className={`status status-${tone}`} aria-live="polite">
      {content}
    </p>
  )
}