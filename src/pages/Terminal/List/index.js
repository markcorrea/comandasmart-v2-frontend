import React, {useState, useEffect, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

import styles from './index.module.scss'

const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
]

const TerminalList = () => {
  const {showMenu, setLoading} = useStore()
  const history = useHistory()

  const {getTerminals} = services

  const [terminals, setTerminals] = useState([])

  const newTerminals = useMemo(() => terminals.map(terminal => ({...terminal, value: terminal.id})), [terminals])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTerminals = async () => {
      setLoading(true)
      const result = await getTerminals()
      if (result) {
        setTerminals(result.data)
      }
      setLoading(false)
    }
    fetchTerminals()
  }, [getTerminals, setTerminals, setLoading])

  return (
    <>
      <header className={styles.header}>
        <h1>Terminais</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={newTerminals}
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
