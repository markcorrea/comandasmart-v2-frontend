import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import clients from 'mocks/client'

import {useStore} from 'store'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'email',
    value: 'E-mail',
    textAlign: 'left',
  },
  {
    key: 'cpf',
    value: 'CPF',
    textAlign: 'left',
  },
]

const ClientList = () => {
  const store = useStore()
  const history = useHistory()

  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Clientes</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={clients.data}
          titleColumn='name'
          onEditClick={row => history.push(`/client/details/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => console.log('clickable row', row)}
        />
      </Paper>
    </>
  )
}

export default ClientList
