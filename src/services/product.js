import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useProducts = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const searchProductsByName = useCallback(
    name => {
      setLoading(true)
      return axios
        .post(
          `${server}/products/search/`,
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
  )

  const searchProductByCode = useCallback(
    unique_code => {
      setLoading(true)
      return axios
        .post(
          `${server}/products/search/code/`,
          {unique_code},
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
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token, history, show]
  )

  const getProducts = useCallback(() => {
    setLoading(true)
    return axios
      .get(`${server}/products/`, {
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
  }, [setLoading, token, history, show])

  const getProductById = useCallback(
    id => {
      setLoading(true)
      return axios
        .get(`${server}/products/${id}/`, {
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
    },
    [setLoading, token, history, show]
  )

  const saveProduct = useCallback(
    body => {
      body = {...body, terminal: body.terminal !== '' ? body.terminal : null}
      // is updating
      if (body.id) {
        setLoading(true)
        return axios
          .patch(`${server}/products/${body.id}/`, body, {
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
      }
      // is creating
      setLoading(true)
      return axios
        .post(`${server}/products/create/`, body, {
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
    },
    [setLoading, token, history, show]
  )

  const deleteProductById = useCallback(
    id => {
      setLoading(true)
      return axios
        .delete(`${server}/products/${id}/`, {
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
    },
    [setLoading, token, history, show]
  )
  return {
    searchProductsByName,
    searchProductByCode,
    getProducts,
    getProductById,
    saveProduct,
    deleteProductById,
  }
}

export default useProducts
