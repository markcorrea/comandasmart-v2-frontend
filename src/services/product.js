import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import products from 'mocks/product'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useProducts = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
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
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
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
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
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
        console.log('ERROR', error)
        return false
      })
      .finally(() => setLoading(false))
  }, [setLoading, token])

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
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )

  const getProductByCode = useCallback(
    uniqueCode => {
      const newProduct = products.data.find(product => product.uniqueCode === uniqueCode)

      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          if (newProduct) {
            show('Produto encontrado com sucesso!')
            return resolve({data: newProduct})
          }
          show('Produto não encontrado', 'error')
          return resolve(undefined)
        }, 1000)
      })
    },
    [setLoading, show]
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
            console.log('ERROR', error)
            return false
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
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
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
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, token]
  )
  return {
    searchProductsByName,
    searchProductByCode,
    getProducts,
    getProductById,
    getProductByCode,
    saveProduct,
    deleteProductById,
  }
}

export default useProducts

// MOCKS

// const searchProductsByName = useCallback(
//   name =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve(products.data.filter(item => item.name.toLowerCase().includes(name.toLowerCase())))
//       }, 1000)
//     }),
//   [setLoading]
// )

// const getProducts = useCallback(
//   () =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve(products)
//       }, 1000)
//     }),
//   [setLoading]
// )

// const getProductById = useCallback(
//   id =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve({data: products.data.find(product => product.id === id)})
//       }, 1000)
//     }),
//   [setLoading]
// )

// const saveProduct = useCallback(
//   body => {
//     if (body.id) {
//       // is updating
//       return new Promise(resolve => {
//         setLoading(true)
//         setTimeout(() => {
//           show('Produto salvo com sucesso!')
//           setLoading(false)
//           resolve(body)
//         }, 1000)
//       })
//     }
//     // is creating
//     return new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         show('Produto criado com sucesso!')
//         setLoading(false)
//         resolve(body)
//       }, 1000)
//     })
//   },
//   [setLoading, show]
// )

// const deleteProductById = useCallback(
//   id =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         show('Produto removido com sucesso!')
//         resolve({...products, data: products.data.filter(product => product.id !== id)})
//       }, 1000)
//     }),
//   [setLoading, show]
// )
