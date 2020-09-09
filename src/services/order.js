import {useCallback} from 'react'
import orders from 'mocks/order'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useOrders = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getOrdersByTerminalId = useCallback(
    terminalId => {
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve({data: orders.data.filter(order => order.terminalId === terminalId)})
        }, 1000)
      })
    },
    [setLoading]
  )

  const completeOrderById = useCallback(
    (id, terminalId) => {
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Pedido preparado com sucesso!')
          resolve({data: orders.data.filter(order => order.terminalId === terminalId && order.id !== id)})
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const completeAllOrdersByTerminalId = useCallback(
    terminalId => {
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Pedidos preparados com sucesso!')
          resolve({data: []})
        }, 1000)
      })
    },
    [setLoading, show]
  )

  return {
    getOrdersByTerminalId,
    completeOrderById,
    completeAllOrdersByTerminalId,
  }
}

export default useOrders
