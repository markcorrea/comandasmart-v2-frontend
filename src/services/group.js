import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useGroups = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getGroups = useCallback(() => {
    const uuid = v4()
    addRequestLoading(uuid)

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
      .finally(() => removeRequestLoading(uuid))
  }, [addRequestLoading, removeRequestLoading, token, history, show])

  return {
    getGroups,
  }
}

export default useGroups
