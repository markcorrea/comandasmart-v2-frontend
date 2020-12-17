import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useTickets = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getTickets = useCallback(() => {
    const uuid = v4()
    addRequestLoading(uuid)
    return axios
      .get(`${server}/tickets/`, {
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
      })
      .finally(() => removeRequestLoading(uuid))
  }, [addRequestLoading, removeRequestLoading, token, history, show])

  const getTicketById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .get(`${server}/tickets/${id}/`, {
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
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const addProductToTicketByCode = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/tickets/product/add-by-code/`, body, {
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
          if (error.response.status === 500) {
            show('Houve um erro ao buscar o produto', 'error')
          }
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const addProductsToTicketById = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/tickets/product/add-by-id/`, body, {
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
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const bindClientToTicket = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/tickets/client/bind/`, body, {
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
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const unbindClientFromTicket = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/tickets/client/unbind/`, body, {
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
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const createTicketByCode = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/tickets/create/`, body, {
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
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const changeTicketCode = useCallback(
    ({id, unique_code}) => {
      const uuid = v4()
      addRequestLoading(uuid)
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  return {
    getTickets,
    getTicketById,
    addProductToTicketByCode,
    addProductsToTicketById,
    bindClientToTicket,
    unbindClientFromTicket,
    createTicketByCode,
    changeTicketCode,
  }
}

export default useTickets
