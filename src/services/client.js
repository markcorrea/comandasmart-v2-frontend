import {useCallback} from 'react'
import clients from 'mocks/client'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useClients = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getClients = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(clients)
        }, 1000)
      }),
    [setLoading]
  )

  const getClientById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve({data: clients.data.find(client => client.id === id)})
        }, 1000)
      }),
    [setLoading]
  )

  const saveClient = useCallback(
    body => {
      if (body.id) {
        // is updating
        return new Promise(resolve => {
          setLoading(true)
          setTimeout(() => {
            show('Cliente salvo com sucesso!')
            setLoading(false)
            resolve(body)
          }, 1000)
        })
      }
      // is creating
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          show('Cliente criado com sucesso!')
          setLoading(false)
          resolve(body)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const deleteClientById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Cliente removido com sucesso!')
          resolve({...clients, data: clients.data.filter(client => client.id !== id)})
        }, 1000)
      }),
    [setLoading, show]
  )

  return {
    getClients,
    getClientById,
    saveClient,
    deleteClientById,
  }
}

export default useClients
