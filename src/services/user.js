import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useUsers = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getUsers = useCallback(() => {
    setLoading(true)
    return axios
      .get(`${server}/users/`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        return response
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/')
          show('Usuário não possui permissão', 'error')
        }
      })
      .finally(() => setLoading(false))
  }, [setLoading, token, show, history])

  const getUserById = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/users/details/${id}/`, {
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

  const getUserInfoByToken = useCallback(() => {
    const refreshedToken = `Token ${verifyToken()}`
    return axios
      .get(`${server}/user/`, {
        headers: {
          Authorization: refreshedToken,
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
  }, [history, show])

  const saveUser = useCallback(
    body => {
      // is updating
      if (body.id) {
        setLoading(true)
        return axios
          .patch(`${server}/users/edit/${body.id}/`, body, {
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
      }

      // is creating
      setLoading(true)
      return axios
        .post(`${server}/users/create/`, body, {
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

  const deleteUserById = useCallback(
    id => {
      setLoading(true)
      return axios
        .delete(`${server}/users/delete/${id}/`, {
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

  return {
    getUsers,
    getUserById,
    getUserInfoByToken,
    saveUser,
    deleteUserById,
  }
}

export default useUsers
