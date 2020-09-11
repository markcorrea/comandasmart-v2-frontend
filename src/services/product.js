import {useCallback} from 'react'
import products from 'mocks/product'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useProducts = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const searchProducts = useCallback(
    search =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(products.data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
        }, 1000)
      }),
    [setLoading]
  )

  const getProducts = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(products)
        }, 1000)
      }),
    [setLoading]
  )

  const getProductById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve({data: products.data.find(product => product.id === id)})
        }, 1000)
      }),
    [setLoading]
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
      if (body.id) {
        // is updating
        return new Promise(resolve => {
          setLoading(true)
          setTimeout(() => {
            show('Produto salvo com sucesso!')
            setLoading(false)
            resolve(body)
          }, 1000)
        })
      }
      // is creating
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          show('Produto criado com sucesso!')
          setLoading(false)
          resolve(body)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const deleteProductById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Produto removido com sucesso!')
          resolve({...products, data: products.data.filter(product => product.id !== id)})
        }, 1000)
      }),
    [setLoading, show]
  )
  return {
    searchProducts,
    getProducts,
    getProductById,
    getProductByCode,
    saveProduct,
    deleteProductById,
  }
}

export default useProducts
