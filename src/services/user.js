import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import users from 'mocks/user'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useUsers = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getUsers = useCallback(() => {
    setLoading(true)
    const token = `Token ${verifyToken()}`
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
        console.log('ERROR', error)
        return false
      })
      .finally(() => setLoading(false))
  }, [setLoading])

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
    const token = `Token ${verifyToken()}`
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
        console.log('ERROR', error)
        return false
      })
  }, [setLoading])

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
