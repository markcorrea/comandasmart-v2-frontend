import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import tickets from 'mocks/ticket'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useCashiers = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const token = `Token ${verifyToken()}`

  const getCashiers = useCallback(() => {
    setLoading(true)

    return axios
      .get(`${server}/cashiers/`, {
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

  const openCashier = useCallback(() => {
    setLoading(true)
    return axios
      .post(
        `${server}/cashiers/create/`,
        {},
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
  }, [setLoading, token])

  const getCashierById = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/cashiers/${id}/`, {
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

  const quickSale = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/cashiers/quick-sale/`, body, {
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

  const payProductsByTicketAndCashier = useCallback(
    (ticketId, cashierId, productIdArray) => {
      const ticket = tickets.data.find(ticket => ticket.id === ticketId)

      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Produtos pagos com sucesso!')
          const responseProducts = ticket.items.filter(product => {
            return !productIdArray.some(item => item === product.id)
          })
          return resolve({...ticket, items: responseProducts})
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const payProductsByCashier = useCallback(
    (cashierId, productIdArray) => {
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Venda realizada com sucesso!')
          return resolve(true)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const payOrdersByTicketAndCashier = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/cashiers/ticket/sell/`, body, {
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

  const removeOrdersByTicketAndCashier = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/cashiers/ticket/remove/`, body, {
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

  const payAllOrdersAndCloseTicket = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/cashiers/ticket/close/`, body, {
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

  const closeCashierById = useCallback(
    ({id, close_date}) => {
      setLoading(true)
      return axios
        .patch(
          `${server}/cashiers/${id}/`,
          {close_date},
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
    getCashiers,
    getCashierById,
    payProductsByTicketAndCashier,
    payProductsByCashier,
    payAllOrdersAndCloseTicket,
    payOrdersByTicketAndCashier,
    removeOrdersByTicketAndCashier,
    quickSale,
    openCashier,
    closeCashierById,
  }
}

export default useCashiers
