import {useCallback} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

import server from 'services/server'
import {verifyToken} from 'utils/authentication'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useReports = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const token = `Token ${verifyToken()}`

  const getSalesReport = useCallback(
    ({start_date, end_date}, page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(
          `${server}/reports/sales/${page ? '?page=' + page : ''}`,
          {start_date, end_date},
          {
            headers: {
              Authorization: token,
            },
          }
        )
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
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  const getProductSalesReport = useCallback(
    ({start_date, end_date}, page = null) => {
      const uuid = v4()
      addRequestLoading(uuid)
      return axios
        .post(
          `${server}/reports/product-sales/${page ? '?page=' + page : ''}`,
          {start_date, end_date},
          {
            headers: {
              Authorization: token,
            },
          }
        )
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
    [addRequestLoading, removeRequestLoading, token, history, show]
  )

  return {
    getSalesReport,
    getProductSalesReport,
  }
}

export default useReports
