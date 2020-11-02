import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useCashiers = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

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
        show('Caixas encontrados com sucesso!')
        return response.data
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/')
          show('Usuário não possui permissão', 'error')
        }
        return false
      })
      .finally(() => setLoading(false))
  }, [setLoading, token, history, show])

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
        if (error.response.status === 401) {
          history.push('/')
          show('Usuário não possui permissão', 'error')
        }
        return false
      })
      .finally(() => setLoading(false))
  }, [setLoading, token, history, show])

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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
  )

  return {
    getCashiers,
    getCashierById,
    payAllOrdersAndCloseTicket,
    payOrdersByTicketAndCashier,
    removeOrdersByTicketAndCashier,
    quickSale,
    openCashier,
    closeCashierById,
  }
}

export default useCashiers
