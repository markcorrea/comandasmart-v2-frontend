import {useCallback} from 'react'
import cashiers from 'mocks/cashier'

import {useStore} from 'store'

const useCashiers = () => {
  const {setLoading} = useStore()

  const getCashiers = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)

        setTimeout(() => {
          setLoading(false)
          resolve(cashiers)
        }, 1000)
      }),
    [setLoading]
  )

  return {
    getCashiers,
  }
}

export default useCashiers
