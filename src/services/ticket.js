import tickets from 'mocks/ticket'

const getTicketById = id =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(tickets.data.find(item => item.id === id))
    }, 1000)
  })

export default {
  getTicketById,
}
