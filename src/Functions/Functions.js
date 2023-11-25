export const slicedString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str
  }
  const lastSpaceIndex = str.lastIndexOf(' ', maxLength)
  return lastSpaceIndex > 0 ? str.slice(0, lastSpaceIndex) + '...' : str.slice(0, maxLength) + '...'
}
export const setVoteClass = (vote) => {
  const colorClasses = {
    green: vote > 7,
    gold: vote > 5 && vote <= 7,
    orange: vote > 3 && vote <= 5,
    red: vote >= 0 && vote <= 3,
  }
  return Object.keys(colorClasses).find((color) => colorClasses[color])
}
