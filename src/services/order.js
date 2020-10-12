import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'

const useOrders = () => {
  const {setLoading} = useStore()
  const token = `Token ${verifyToken()}`

  const completeOrderById = useCallback(
    id => {
      setLoading(true)
      return axios
        .post(
          `${server}/orders/complete/${id}/`,
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
    },
    [setLoading, token]
  )

  const completeAllOrdersByTerminalId = useCallback(
    id => {
      setLoading(true)
      return axios
        .post(
          `${server}/orders/complete-all/${id}/`,
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
    },
    [setLoading, token]
  )

  return {
    completeOrderById,
    completeAllOrdersByTerminalId,
  }
}

export default useOrders
