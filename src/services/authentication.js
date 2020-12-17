import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {applyToken, verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useAuthentication = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const token = `Token ${verifyToken()}`
  const history = useHistory()

  const login = useCallback(
    body => {
      const uuid = v4()
      addRequestLoading(uuid)
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
        .finally(() => removeRequestLoading(uuid))
    },
    [addRequestLoading, removeRequestLoading, show]
  )

  const logout = useCallback(() => {
    const uuid = v4()
    addRequestLoading(uuid)
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
      .finally(() => removeRequestLoading(uuid))
  }, [addRequestLoading, removeRequestLoading, token, history, show])

  const sendRecoverEmail = useCallback(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      }),
    []
  )

  const changePassword = useCallback(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      }),
    []
  )

  return {
    login,
    logout,
    sendRecoverEmail,
    changePassword,
  }
}

export default useAuthentication
