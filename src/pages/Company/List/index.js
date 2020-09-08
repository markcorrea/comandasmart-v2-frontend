import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'uniqueCode',
    value: 'Código',
    textAlign: 'left',
  },
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const CompanyList = () => {
  const {showMenu, setLoading, loading} = useStore()
  const history = useHistory()

  const {getCompanies} = services

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      const result = await getCompanies()
      if (result) {
        setCompanies(result.data)
      }
      setLoading(false)
    }
    fetchCompanies()
  }, [getCompanies, setCompanies, setLoading])

  return (
    <>
      <header className={styles.header}>
        <h1>Empresas</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={companies}
          titleColumn='name'
          onEditClick={row => history.push(`/company/${row.id}`)}
          rowClickable={row => history.push(`/company/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          emptyTableMessage='Não há empresas registradas.'
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default CompanyList
