import React, {useState, useEffect, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'

import {useStore} from 'store'
import companyResponse from 'mocks/company'

import CompanyForm from 'forms/CompanyForm'

import styles from './index.module.scss'

const CompanyDetails = () => {
  const store = useStore()
  const {companyId} = useParams()
  const history = useHistory()

  const [company, setCompany] = useState({})

  const fetchCompany = useCallback(id => {
    const result = companyResponse.data.find(item => item.id === id)
    return result
  }, [])

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    if (companyId && companyId !== company.id) {
      const newCompany = fetchCompany(companyId)
      setCompany(newCompany)
    }
  }, [company, fetchCompany, setCompany, companyId])

  return (
    <>
      <header className={styles.header}>
        <h1>{companyId ? 'Editar' : 'Criar'} Empresa</h1>
      </header>
      <Paper className={styles.paper}>
        <CompanyForm
          company={company}
          onSubmit={data => console.log('SUBMIT', data)}
          onCancel={() => history.push('/companies')}
        />
      </Paper>
    </>
  )
}

export default CompanyDetails
