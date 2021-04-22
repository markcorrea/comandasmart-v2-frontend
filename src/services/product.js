import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useProducts = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const searchProductsByName = useCallback(
    (name = '', page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(
          `${server}/products/search/${page ? '?page=' + page : ''}`,
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

  const searchProductByCode = useCallback(
    unique_code => {
      const uuid = v4()
      addRequestLoading(uuid)
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
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
          if (error.response.status === 500) {
            show('Houve um erro ao buscar o produto', 'error')
          }
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const getProducts = useCallback(
    (page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .get(`${server}/products/${page ? '?page=' + page : ''}`, {
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
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const getProductById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .get(`${server}/products/${id}/`, {
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

  const saveProduct = useCallback(
    body => {
      body = {...body, terminal: body.terminal !== '' ? body.terminal : null}
      // is updating
      if (body.id) {
        const uuid = v4()
        addRequestLoading(uuid)
        return axios
          .patch(`${server}/products/${body.id}/`, body, {
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
      const uuid = v4()
      addRequestLoading(uuid)
      // is creating
      return axios
        .post(`${server}/products/create/`, body, {
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

  const deleteProductById = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .delete(`${server}/products/${id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return {success: true, data: response.data}
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
            return
          }
          return error.response.data
        })
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, token, history, show]
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
