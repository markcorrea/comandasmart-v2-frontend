import {useCallback} from 'react'
import products from 'mocks/product'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useProducts = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getMostSoldProducts = useCallback(
    search =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Relatório encontrado com sucesso!')
          const result = products.data.map((product, index) => ({...product, sold: products.data.length - index}))
          resolve({...products, data: result})
        }, 1000)
      }),
    [setLoading, show]
  )

  const getSalesByFilter = useCallback(
    search =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Relatório encontrado com sucesso!')
          resolve(products)
        }, 1000)
      }),
    [setLoading, show]
  )

  return {
    getMostSoldProducts,
    getSalesByFilter,
  }
}

export default useProducts
