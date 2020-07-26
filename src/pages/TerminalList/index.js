import React, {useEffect, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import terminalsResponse from 'mocks/terminal'

import {useStore} from 'store'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const TerminalList = () => {
  const store = useStore()
  const history = useHistory()

  const terminals = useMemo(() => terminalsResponse.map(terminal => ({...terminal, value: terminal.id})), [terminalsResponse])

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
          onViewClick={row => console.log('view', row)}
          onEditClick={row => console.log('edit', row)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => console.log('clickable row', row)}
        />
      </Paper>
    </>
  )
}

export default memo(TerminalList)
