export default function Cell({ value, isWinning, disabled, onClick }) {
  const classes = ['cell']
  if (value) classes.push(`cell-${value.toLowerCase()}`)
  if (isWinning) classes.push('cell-winning')

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Клітинка: ${value}` : 'Порожня клітинка'}
    >
      {value}
    </button>
  )
}