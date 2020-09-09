import React, {useState, useEffect, useCallback} from 'react'
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
  const {showMenu} = useStore()
  const history = useHistory()
  const {getTerminals, deleteTerminalById} = useServices()

  const [terminals, setTerminals] = useState([])

  const tableButtons = [
    {
      label: 'Novo Terminal',
      onClick: () => history.push(`/terminal/`),
    },
  ]

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTerminals = async () => {
      const result = await getTerminals()
      if (result) setTerminals(result.data)
    }
    fetchTerminals()
  }, [getTerminals, setTerminals])

  const deleteTerminal = useCallback(
    async id => {
      const result = await deleteTerminalById(id)
      if (result) setTerminals(result.data)
    },
    [deleteTerminalById]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Terminais</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={terminals}
          titleColumn='name'
          onDeleteClick={row => deleteTerminal(row.id)}
          onViewClick={row => history.push(`/terminal/${row.id}/view`)}
          onEditClick={row => history.push(`/terminal/${row.id}`)}
          rowClickable={row => history.push(`/terminal/${row.id}`)}
          emptyTableMessage='Não há comandas registradas.'
        />
        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </Paper>
    </>
  )
}

export default TerminalList
