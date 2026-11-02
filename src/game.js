export const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

export function getResult(cells) {
  for (const line of winningLines) {
    const [a, b, c] = line
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line, isDraw: false }
    }
  }
  const isDraw = cells.every((cell) => cell !== null)
  return { winner: null, line: [], isDraw }
}