import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useMenus = () => {
  const {show} = useMessage()
  const history = useHistory()

  const getMenus = useCallback(
    id => {
      const refreshedToken = `Token ${verifyToken()}`
      return axios
        .get(`${server}/menus/`, {
          headers: {
            Authorization: refreshedToken,
          },
        })
        .then(response => {
          console.log('SUCCESS')
          return response.data
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/')
            show('Usuário não possui permissão', 'error')
          }
        })
    },
    [history, show]
  )

  return {
    getMenus,
  }
}

export default useMenus
