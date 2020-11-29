import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useGroups = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getGroups = useCallback(() => {
    setLoading(true)

    return axios
      .get(`${server}/groups/`, {
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
      .finally(() => setLoading(false))
  }, [setLoading, token, history, show])

  return {
    getGroups,
  }
}

export default useGroups
