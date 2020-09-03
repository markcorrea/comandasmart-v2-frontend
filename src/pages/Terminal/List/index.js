import React, {useEffect, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import terminalsResponse from 'mocks/terminal'

import {useStore} from 'store'

import styles from './index.module.scss'

const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const TerminalList = () => {
  const store = useStore()
  const history = useHistory()

  const terminals = useMemo(() => terminalsResponse.data.map(terminal => ({...terminal, value: terminal.id})), [])

  useEffect(() => {
    store.showMenu()
  }, [store])

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
          onViewClick={row => history.push(`/terminal/view/${row.id}`)}
          onEditClick={row => history.push(`/terminal/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => history.push(`/terminal/${row.id}`)}
          emptyTableMessage='Não há comandas registradas.'
        />
      </Paper>
    </>
  )
}

export default memo(TerminalList)
