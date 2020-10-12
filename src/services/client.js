import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'

const useClients = () => {
  const {setLoading} = useStore()
  const token = `Token ${verifyToken()}`

  const searchClientsByName = useCallback(
    name => {
      setLoading(true)
      return axios
        .post(
          `${server}/clients/search/`,
          {name},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const getClients = useCallback(() => {
    setLoading(true)

    return axios
      .get(`${server}/clients/`, {
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
  }, [setLoading, token])

  const getClientById = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/clients/${id}/`, {
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
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const saveClient = useCallback(
    body => {
      // is updating
      if (body.id) {
        setLoading(true)
        return axios
          .patch(`${server}/clients/${body.id}/`, body, {
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
          .finally(() => setLoading(false))
      }
      // is creating

      setLoading(true)
      return axios
        .post(`${server}/clients/create/`, body, {
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
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const deleteClientById = useCallback(
    id => {
      setLoading(true)
      return axios
        .delete(`${server}/clients/${id}/`, {
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
        .finally(() => setLoading(false))
    },
    [setLoading, token]
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

// MOCKS

// const getClients = useCallback(
//   () =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve(clients)
//       }, 1000)
//     }),
//   [setLoading]
// )

// const getClientById = useCallback(
//   id =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve({data: clients.data.find(client => client.id === id)})
//       }, 1000)
//     }),
//   [setLoading]
// )

// const saveClient = useCallback(
//   body => {
//     if (body.id) {
//       // is updating
//       return new Promise(resolve => {
//         setLoading(true)
//         setTimeout(() => {
//           show('Cliente salvo com sucesso!')
//           setLoading(false)
//           resolve(body)
//         }, 1000)
//       })
//     }
//     // is creating
//     return new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         show('Cliente criado com sucesso!')
//         setLoading(false)
//         resolve(body)
//       }, 1000)
//     })
//   },
//   [setLoading, show]
// )

// const deleteClientById = useCallback(
//   id =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         show('Cliente removido com sucesso!')
//         resolve({...clients, data: clients.data.filter(client => client.id !== id)})
//       }, 1000)
//     }),
//   [setLoading, show]
// )
