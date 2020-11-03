import {useCallback} from 'react'
import companies from 'mocks/company'
import axios from 'axios'
import server from 'services/server'

import {useStore} from 'store'
import {useMessage} from 'components/Message'
import {useHistory} from 'react-router-dom'

const useCompanies = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()
  const history = useHistory()

  const getCompanies = useCallback(() => {
    setLoading(true)
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
      .finally(() => setLoading(false))
  }, [setLoading, history, show])

  const getCompanyById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve({data: companies.data.find(company => company.id === id)})
        }, 1000)
      }),
    [setLoading]
  )

  const saveCompany = useCallback(
    body => {
      if (body.id) {
        // is updating
        return new Promise(resolve => {
          setLoading(true)
          setTimeout(() => {
            show('Empresa salva com sucesso!')
            setLoading(false)
            resolve(body)
          }, 1000)
        })
      }
      // is creating
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          show('Empresa criada com sucesso!')
          setLoading(false)
          resolve(body)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const deleteCompanyById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Empresa removida com sucesso!')
          resolve({...companies, data: companies.data.filter(company => company.id !== id)})
        }, 1000)
      }),
    [setLoading, show]
  )

  return {
    getCompanies,
    getCompanyById,
    saveCompany,
    deleteCompanyById,
  }
}

export default useCompanies
