import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useTickets = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

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
        return response.data
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/')
          show('Usuário não possui permissão', 'error')
        }
      })
      .finally(() => setLoading(false))
  }, [setLoading, token, history, show])

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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
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
