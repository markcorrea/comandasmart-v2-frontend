import {useCallback} from 'react'
import {useStore} from 'store'

const useAuthentication = () => {
  const {setLoading} = useStore()

  const login = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(true)
        }, 1000)
      }),
    [setLoading]
  )

  const sendRecoverEmail = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(true)
        }, 1000)
      }),
    [setLoading]
  )

  const changePassword = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(true)
        }, 1000)
      }),
    [setLoading]
  )

  return {
    login,
    sendRecoverEmail,
    changePassword,
  }
}

export default useAuthentication
