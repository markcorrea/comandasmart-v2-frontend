import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'

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
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const {getClients, deleteClientById} = useServices()

  const [clients, setClients] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  const speedDialButtons = useMemo(
    () => [
      {
        label: 'Novo Cliente',
        onClick: () => history.push(`/client/`),
      },
    ],
    [history]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchClients = async () => {
      const result = await getClients()
      if (result) setClients(result.data)
    }
    fetchClients()
  }, [getClients, setClients])

  const deleteClient = useCallback(
    async id => {
      const result = await deleteClientById(id)
      if (result) {
        setClients(result)
        const newClients = await getClients()
        if (newClients) setClients(newClients.data)
      }
    },
    [deleteClientById, setClients, getClients]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Clientes</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={clients.data || []}
          titleColumn='name'
          onEditClick={row => history.push(`/client/${row.id}`)}
          onDeleteClick={row =>
            confirmationDialog({
              header: 'Excluir cliente',
              body: `Deseja realmente excluir "${row.name}"?`,
              onConfirm: () => deleteClient(row.id),
            })
          }
          rowClickable={row => history.push(`/client/${row.id}`)}
          emptyTableMessage='Não há clientes registrados.'
          loading={loading}
        />
      </Paper>
      <div className={styles.speedDialContainer}>
        <SpeedDial buttons={speedDialButtons} />
      </div>
    </>
  )
}

export default memo(ClientList)
