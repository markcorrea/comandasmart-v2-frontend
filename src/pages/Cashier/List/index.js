import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import cashiers from 'mocks/cashier'

import {useStore} from 'store'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'opened',
    value: 'Abertura',
    textAlign: 'left',
  },
  {
    key: 'closed',
    value: 'Fechamento',
    textAlign: 'left',
  },
  {
    key: 'totalValue',
    value: 'Valor Total',
    textAlign: 'left',
  },
]

const CashierList = () => {
  const store = useStore()
  const history = useHistory()

  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Caixas</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={cashiers.data}
          titleColumn='name'
          rowClickable={row => history.push(`/cashier/${row.id}`)}
          emptyTableMessage='Não há caixas registrados.'
        />
      </Paper>
    </>
  )
}

export default CashierList
