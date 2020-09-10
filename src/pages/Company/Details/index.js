import React, {useState, useEffect, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import CompanyForm from 'forms/CompanyForm'

import styles from './index.module.scss'

const CompanyDetails = () => {
  const {showMenu, loading} = useStore()
  const {companyId} = useParams()
  const history = useHistory()
  const {getCompanyById, saveCompany} = useServices()

  const [company, setCompany] = useState({})

  useEffect(() => {
    const fetchCompany = async () => {
      const result = await getCompanyById(companyId)
      if (result) setCompany(result.data)
    }

    if (companyId) fetchCompany()
  }, [companyId, getCompanyById, setCompany])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const postCompany = useCallback(
    async body => {
      const payload = {
        ...body,
        ...(companyId ? {id: companyId} : {}),
      }
      const result = await saveCompany(payload)
      if (result) history.push(`/companies`)
    },
    [companyId, saveCompany, history]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>{companyId ? 'Editar' : 'Criar'} Empresa</h1>
      </header>
      <Paper className={styles.paper}>
        <CompanyForm
          company={company}
          onSubmit={data => postCompany(data)}
          onCancel={() => history.push('/companies')}
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default CompanyDetails
