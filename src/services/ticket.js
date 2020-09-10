import {useCallback} from 'react'
import tickets from 'mocks/ticket'
import products from 'mocks/product'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useTickets = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getTickets = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(tickets)
        }, 1000)
      }),
    [setLoading]
  )

  const getTicketById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(tickets.data.find(item => item.id === id))
        }, 1000)
      }),
    [setLoading]
  )

  const addProductsToTicketByCode = useCallback(
    (ticketId, uniqueCode) => {
      const ticket = tickets.data.find(ticket => ticket.id === ticketId)
      const newProduct = products.data.find(product => product.uniqueCode === uniqueCode)

      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          if (newProduct) {
            show('Produto adicionado com sucesso!')
            return resolve({...ticket, items: [...ticket.items, newProduct]})
          }
          show('Produto não encontrado', 'error')
          return resolve(undefined)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const addProductsToTicketById = useCallback(
    (ticketId, productId, quantity) => {
      const ticket = tickets.data.find(ticket => ticket.id === ticketId)
      const newProduct = products.data.find(product => product.id === productId)

      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          if (newProduct) {
            show('Produto adicionado com sucesso!')
            const productsToAdd = Array.from({length: quantity}).map(() => newProduct)
            return resolve({...ticket, items: [...ticket.items, ...productsToAdd]})
          }
          show('Produto não encontrado', 'error')
          return resolve(undefined)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  return {
    getTickets,
    getTicketById,
    addProductsToTicketByCode,
    addProductsToTicketById,
  }
}

export default useTickets
