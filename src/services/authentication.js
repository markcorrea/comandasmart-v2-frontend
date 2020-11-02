import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {applyToken, verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useAuthentication = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const token = `Token ${verifyToken()}`
  const history = useHistory()

  const login = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/login/`, body, {})
        .then(response => {
          applyToken(response.data.token)
          show('Usuário logado com sucesso!')
          return response.data
        })
        .catch(error => {
          show('Usuário ou senha não encontrados.', 'error')
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading, show]
  )

  const logout = useCallback(() => {
    setLoading(true)
    return axios
      .get(`${server}/logout/`, {
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
          show('Houve um problema ao realizar operação', 'error')
        }
        return false
      })
      .finally(() => setLoading(false))
  }, [setLoading, token, history, show])

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
    logout,
    sendRecoverEmail,
    changePassword,
  }
}

export default useAuthentication
