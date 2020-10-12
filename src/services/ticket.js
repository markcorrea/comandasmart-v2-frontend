import {useCallback} from 'react'
import tickets from 'mocks/ticket'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useTickets = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const token = `Token ${verifyToken()}`

  const getTickets = useCallback(() => {
    setLoading(true)
    return axios
      .get(`${server}/tickets/`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        console.log('SUCCESS')
        return response.data
      })
      .catch(error => {
        console.log('ERROR', error)
        return false
      })
      .finally(() => setLoading(false))
  }, [setLoading, token])

  const getTicketById = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/tickets/${id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const addProductToTicketByCode = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/tickets/product/add-by-code/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const addProductsToTicketById = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/tickets/product/add-by-id/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const removeProductFromTicket = useCallback(
    (ticketId, productId) => {
      const ticket = tickets.data.find(ticket => ticket.id === ticketId)

      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Produto removido com sucesso!')
          return resolve({...ticket, items: [...ticket.items.filter(item => item.id !== productId)]})
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const removeProductsFromTicket = useCallback(
    (ticketId, productIdArray) => {
      const ticket = tickets.data.find(ticket => ticket.id === ticketId)

      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Produtos removidos com sucesso!')
          const responseProducts = ticket.items.filter(product => {
            return !productIdArray.some(item => item === product.id)
          })
          return resolve({...ticket, items: responseProducts})
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const bindClientToTicket = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/tickets/client/bind/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const unbindClientFromTicket = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/tickets/client/unbind/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const createTicketByCode = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/tickets/create/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const changeTicketCode = useCallback(
    ({id, unique_code}) => {
      setLoading(true)
      return axios
        .patch(
          `${server}/tickets/${id}/`,
          {unique_code},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  return {
    getTickets,
    getTicketById,
    addProductToTicketByCode,
    addProductsToTicketById,
    removeProductFromTicket,
    removeProductsFromTicket,
    bindClientToTicket,
    unbindClientFromTicket,
    createTicketByCode,
    changeTicketCode,
  }
}

export default useTickets

// MOCKS

// const getTickets = useCallback(
//   () =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve(tickets)
//       }, 1000)
//     }),
//   [setLoading]
// )

// const getTicketById = useCallback(
//   id =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve(tickets.data.find(item => item.id === id))
//       }, 1000)
//     }),
//   [setLoading]
// )

// const createTicketByCode = useCallback(
//   code => {
//     return new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         show('Ticket criado com sucesso!')
//         return resolve({data: tickets.data[0]})
//       }, 1000)
//     })
//   },
//   [setLoading, show]
// )

// const addProductToTicketByCode = useCallback(
//   (ticketId, uniqueCode) => {
//     const ticket = tickets.data.find(ticket => ticket.id === ticketId)
//     const newProduct = products.data.find(product => product.uniqueCode === uniqueCode)

//     return new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         if (newProduct) {
//           show('Produto adicionado com sucesso!')
//           return resolve({...ticket, items: [...ticket.items, newProduct]})
//         }
//         show('Produto não encontrado', 'error')
//         return resolve(undefined)
//       }, 1000)
//     })
//   },
//   [setLoading, show]
// )
