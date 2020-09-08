import cashiers from 'mocks/cashier'

const getCashiers = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(cashiers)
    }, 1000)
  })

export default {
  getCashiers,
}
