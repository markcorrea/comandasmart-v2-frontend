import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const TerminalList = () => {
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()
  const {getTerminals, deleteTerminalById} = useServices()

  const [terminals, setTerminals] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  const speedDialButtons = useMemo(
    () => [
      {
        label: 'Novo Terminal',
        onClick: () => history.push(`/terminal/`),
      },
    ],
    [history]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTerminals = async () => {
      const result = await getTerminals()
      if (result) setTerminals(result)
    }
    fetchTerminals()
  }, [getTerminals, setTerminals])

  const confirmDelete = useCallback(
    async ({id}) => {
      const result = await deleteTerminalById(id)
      if (result) setTerminals(result)
    },
    [setTerminals, deleteTerminalById]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Terminais</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={terminals.data || []}
          titleColumn='name'
          onViewClick={row => history.push(`/terminal/${row.id}/view`)}
          onEditClick={row => history.push(`/terminal/${row.id}`)}
          rowClickable={row => history.push(`/terminal/${row.id}`)}
          onDeleteClick={row =>
            confirmationDialog({
              header: 'Remover terminal',
              body: `Deseja realmente excluir o terminal "${row.name}?"`,
              onConfirm: () => confirmDelete(row),
            })
          }
          emptyTableMessage='Não há comandas registradas.'
          loading={loading}
        />
      </Paper>
      <div className={styles.speedDialContainer}>
        <SpeedDial buttons={speedDialButtons} />
      </div>
    </>
  )
}

export default memo(TerminalList)
