import React, {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, PlusButton, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'

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
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const {getUsers, deleteUserById} = useServices()

  const [users, setUsers] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers()
      if (result) setUsers(result)
    }
    fetchUsers()
  }, [getUsers, setUsers])

  const deleteUser = useCallback(
    async id => {
      const result = await deleteUserById(id)
      if (result) setUsers(result)
    },
    [deleteUserById, setUsers]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Usuários</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={users.data || []}
          titleColumn='name'
          onEditClick={row => history.push(`/user/${row.id}`)}
          rowClickable={row => history.push(`/user/${row.id}`)}
          onDeleteClick={row =>
            confirmationDialog({
              header: 'Excluir usuário',
              body: `Deseja realmente excluir "${row.name}"?`,
              onConfirm: () => deleteUser(row.id),
            })
          }
          emptyTableMessage='Não há usuários registrados.'
          loading={loading}
        />
      </Paper>
      <div className={styles.plusButtonContainer}>
        <PlusButton onClick={() => history.push(`/user/`)} />
      </div>
    </>
  )
}

export default UserList
