import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'

const useTerminals = () => {
  const {setLoading} = useStore()
  const token = `Token ${verifyToken()}`

  const getTerminals = useCallback(() => {
    setLoading(true)
    return axios
      .get(`${server}/terminals/`, {
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
  }, [setLoading, token])

  const getTerminalById = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/terminals/${id}/`, {
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

  const saveTerminal = useCallback(
    body => {
      // is updating
      if (body.id) {
        setLoading(true)
        return axios
          .patch(`${server}/terminals/${body.id}/`, body, {
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
        .post(`${server}/terminals/create/`, body, {
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

  const deleteTerminalById = useCallback(
    id => {
      setLoading(true)
      return axios
        .delete(`${server}/terminals/${id}/`, {
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
    getTerminals,
    getTerminalById,
    saveTerminal,
    deleteTerminalById,
  }
}

export default useTerminals

// MOCKS

// const getTerminals = useCallback(() => {
//   return new Promise(resolve => {
//     setLoading(true)
//     setTimeout(() => {
//       setLoading(false)
//       resolve(terminals)
//     }, 1000)
//   })
// }, [setLoading])

// const saveTerminal = useCallback(
//   body => {
//     if (body.id) {
//       // is updating
//       return new Promise(resolve => {
//         setLoading(true)
//         setTimeout(() => {
//           show('Terminal salvo com sucesso!')
//           setLoading(false)
//           resolve(body)
//         }, 1000)
//       })
//     }
//     // is creating
//     return new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         show('Terminal criado com sucesso!')
//         setLoading(false)
//         resolve(body)
//       }, 1000)
//     })
//   },
//   [setLoading, show]
// )

// const deleteTerminalById = useCallback(
//   id =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         show('Terminal removido com sucesso!')
//         resolve({...terminals, data: terminals.data.filter(terminal => terminal.id !== id)})
//       }, 1000)
//     }),
//   [setLoading, show]
// )
