import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useMenus = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const getMenus = useCallback(
    id => {
      const uuid = v4()
      addRequestLoading(uuid)
      const refreshedToken = `Token ${verifyToken()}`
      return axios
        .get(`${server}/menus/`, {
          headers: {
            Authorization: refreshedToken,
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
    [addRequestLoading, removeRequestLoading, history, show]
  )

  return {
    getMenus,
  }
}

export default useMenus
