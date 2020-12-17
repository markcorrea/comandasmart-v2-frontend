import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useCashiers = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getCashiers = useCallback(
    (page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)

      return axios
        .get(`${server}/cashiers/${page ? '?page=' + page : ''}`, {
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
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const openCashier = useCallback(() => {
    const uuid = v4()
    addRequestLoading(uuid)
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
        return response.data
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/')
          show('Usuário não possui permissão', 'error')
        }
        return false
      })
      .finally(() => removeRequestLoading(uuid))
  }, [addRequestLoading, removeRequestLoading, token, history, show])

  const getCashierById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .get(`${server}/cashiers/${id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const quickSale = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/cashiers/quick-sale/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const payOrdersByTicketAndCashier = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/cashiers/ticket/sell/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const removeOrdersByTicketAndCashier = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/cashiers/ticket/remove/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const payAllOrdersAndCloseTicket = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/cashiers/ticket/close/`, body, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const closeCashierById = useCallback(
    ({id, close_date}) => {
      const uuid = v4()
      addRequestLoading(uuid)
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
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
