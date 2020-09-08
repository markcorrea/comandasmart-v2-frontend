import tickets from 'mocks/ticket'

const getTickets = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(tickets)
    }, 1000)
  })

const getTicketById = id =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(tickets.data.find(item => item.id === id))
    }, 1000)
  })

export default {
  getTickets,
  getTicketById,
}
