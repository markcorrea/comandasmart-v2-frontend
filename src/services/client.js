import clients from 'mocks/client'

const getClients = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(clients)
    }, 1000)
  })

export default {
  getClients,
}
