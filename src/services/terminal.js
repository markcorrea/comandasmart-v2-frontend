import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useTerminals = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getTerminals = useCallback(() => {
    const uuid = v4()
    addRequestLoading(uuid)
    return axios
      .get(`${server}/terminals/`, {
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

  const getTerminalById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .get(`${server}/terminals/${id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token]
  )

  const saveTerminal = useCallback(
    body => {
      // is updating
      if (body.id) {
        const uuid = v4()
        addRequestLoading(uuid)
        return axios
          .patch(`${server}/terminals/${body.id}/`, body, {
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
        .post(`${server}/terminals/create/`, body, {
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

  const deleteTerminalById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .delete(`${server}/terminals/${id}/`, {
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
    getTerminals,
    getTerminalById,
    saveTerminal,
    deleteTerminalById,
  }
}

export default useTerminals
