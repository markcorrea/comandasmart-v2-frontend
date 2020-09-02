import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import users from 'mocks/user'

import {useStore} from 'store'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'id',
    value: 'Código',
    textAlign: 'left',
  },
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const UserList = () => {
  const store = useStore()
  const history = useHistory()

  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Usuários</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={users.data}
          titleColumn='name'
          onEditClick={row => history.push(`/user/details/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => console.log('clickable row', row)}
          emptyTableMessage='Não há usuários registrados.'
        />
      </Paper>
    </>
  )
}

export default UserList
