import {useCallback} from 'react'
import {v4} from 'uuid'

import companies from 'mocks/company'
import axios from 'axios'
import server from 'services/server'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useCompanies = () => {
  const {addRequestLoading, removeRequestLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const getCompanies = useCallback(() => {
    const uuid = v4()
    addRequestLoading(uuid)
    return axios
      .get(`${server}/companies/`, {})
      .then(response => {
        return response
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/')
          show('Usuário não possui permissão', 'error')
        }
      })
      .finally(() => removeRequestLoading(uuid))
  }, [addRequestLoading, removeRequestLoading, history, show])

  const getCompanyById = useCallback(
    id =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({data: companies.data.find(company => company.id === id)})
        }, 1000)
      }),
    []
  )

  const saveCompany = useCallback(
    body => {
      if (body.id) {
        // is updating
        return new Promise(resolve => {
          setTimeout(() => {
            show('Empresa salva com sucesso!')
            resolve(body)
          }, 1000)
        })
      }
      // is creating
      return new Promise(resolve => {
        setTimeout(() => {
          show('Empresa criada com sucesso!')
          resolve(body)
        }, 1000)
      })
    },
    [show]
  )

  const deleteCompanyById = useCallback(
    id =>
      new Promise(resolve => {
        setTimeout(() => {
          show('Empresa removida com sucesso!')
          resolve({...companies, data: companies.data.filter(company => company.id !== id)})
        }, 1000)
      }),
    [show]
  )

  return {
    getCompanies,
    getCompanyById,
    saveCompany,
    deleteCompanyById,
  }
}

export default useCompanies
