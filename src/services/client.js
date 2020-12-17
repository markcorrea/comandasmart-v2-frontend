import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useClients = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const searchClientsByName = useCallback(
    (name = '', page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(
          `${server}/clients/search/${page ? '?page=' + page : ''}`,
          {name},
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

  const getClients = useCallback(
    (page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)

      return axios
        .get(`${server}/clients/${page ? '?page=' + page : ''}`, {
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

  const getClientById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .get(`${server}/clients/${id}/`, {
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

  const saveClient = useCallback(
    body => {
      // is updating
      if (body.id) {
        const uuid = v4()
        addRequestLoading(uuid)
        return axios
          .patch(`${server}/clients/${body.id}/`, body, {
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
      }
      // is creating

      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(`${server}/clients/create/`, body, {
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

  const deleteClientById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .delete(`${server}/clients/${id}/`, {
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

  return {
    searchClientsByName,
    getClients,
    getClientById,
    saveClient,
    deleteClientById,
  }
}

export default useClients
