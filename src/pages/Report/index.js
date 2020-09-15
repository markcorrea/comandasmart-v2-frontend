import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import reports from './reports'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Relatório',
    textAlign: 'left',
  },
]

const Reports = () => {
  const {showMenu} = useStore()
  const history = useHistory()

  useEffect(() => {
    showMenu()
  }, [showMenu])

  return (
    <>
      <header className={styles.header}>
        <h1>Relatórios</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={reports || []}
          titleColumn='name'
          onViewClick={({url}) => history.push(`/${url}`)}
          rowClickable={({url}) => history.push(`/${url}`)}
          emptyTableMessage='Não há relatórios disponíveis.'
        />
      </Paper>
    </>
  )
}

export default Reports
