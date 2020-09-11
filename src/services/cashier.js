import {useCallback} from 'react'
import cashiers from 'mocks/cashier'
import tickets from 'mocks/ticket'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useCashiers = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getCashiers = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(cashiers)
        }, 1000)
      }),
    [setLoading]
  )

  const getCashierById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(cashiers.data.find(cashier => cashier.id === id))
        }, 1000)
      }),
    [setLoading]
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

  const openCashier = useCallback(
    id => {
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Caixa aberto com sucesso!')
          return resolve(true)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const closeCashierById = useCallback(
    id => {
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Caixa fechado com sucesso!')
          return resolve(true)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  return {
    getCashiers,
    getCashierById,
    payProductsByTicketAndCashier,
    payProductsByCashier,
    openCashier,
    closeCashierById,
  }
}

export default useCashiers
