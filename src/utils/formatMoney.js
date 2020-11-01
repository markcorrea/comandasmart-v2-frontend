export default money => {
  return `R$ ${money
    .toFixed(2)
    .trim()
    .replace('.', ',')}`
}
