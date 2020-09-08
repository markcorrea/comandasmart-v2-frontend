import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

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
  const {showMenu, setLoading, loading} = useStore()
  const history = useHistory()

  const {getUsers} = services

  const [users, setUsers] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const result = await getUsers()
      if (result) {
        setUsers(result.data)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [getUsers, setUsers, setLoading])

  return (
    <>
      <header className={styles.header}>
        <h1>Usuários</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={users}
          titleColumn='name'
          onEditClick={row => history.push(`/user/${row.id}`)}
          rowClickable={row => history.push(`/user/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          emptyTableMessage='Não há usuários registrados.'
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default UserList
