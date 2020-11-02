import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import users from 'mocks/user'
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
        console.log('SUCCESS')
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
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve({data: users.data.find(user => user.id === id)})
        }, 1000)
      }),
    [setLoading]
  )

  const getUserInfoByToken = useCallback(() => {
    setLoading(true)
    return axios
      .get(`${server}/user/`, {
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
      })
      .finally(() => setLoading(false))
  }, [setLoading, token, history, show])

  const saveUser = useCallback(
    body => {
      if (body.id) {
        // is updating
        return new Promise(resolve => {
          setLoading(true)
          setTimeout(() => {
            show('Usuário salvo com sucesso!')
            setLoading(false)
            resolve(body)
          }, 1000)
        })
      }
      // is creating
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          show('Usuário criado com sucesso!')
          setLoading(false)
          resolve(body)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const deleteUserById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Usuário removido com sucesso!')
          resolve({...users, data: users.data.filter(user => user.id !== id)})
        }, 1000)
      }),
    [setLoading, show]
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
