import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import companies from 'mocks/company'

import {useStore} from 'store'

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
  const store = useStore()
  const history = useHistory()

  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Empresas</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={companies.data}
          titleColumn='name'
          onEditClick={row => history.push(`/company/${row.id}`)}
          rowClickable={row => history.push(`/company/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          emptyTableMessage='Não há empresas registradas.'
        />
      </Paper>
    </>
  )
}

export default CompanyList
