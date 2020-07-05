export default (priceInCents, minimumFractionDigits = 2) => {
  const reals = priceInCents / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
  }).format(reals)
}
