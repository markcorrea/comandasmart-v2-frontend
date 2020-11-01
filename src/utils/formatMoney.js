export default money => {
  return `R$ ${money
    .toString()
    .trim()
    .replace('.', ',')}`
}
