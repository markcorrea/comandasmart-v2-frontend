import {useCallback} from 'react'
import users from 'mocks/user'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useUsers = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getUsers = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(users)
        }, 1000)
      }),
    [setLoading]
  )

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
    saveUser,
    deleteUserById,
  }
}

export default useUsers
