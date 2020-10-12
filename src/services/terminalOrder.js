import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'

const useTerminalOrders = () => {
  const {setLoading} = useStore()
  const token = `Token ${verifyToken()}`

  const getOrdersByTerminalId = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/orders/terminal/${id}/`, {
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


  return {
    getOrdersByTerminalId,
  }
}

export default useTerminalOrders
