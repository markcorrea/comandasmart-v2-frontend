import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import useServices from 'services'

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
  const {showMenu, loading} = useStore()
  const history = useHistory()

  const {getCashiers} = useServices()

  const [cashiers, setCashiers] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchCashiers = async () => {
      const result = await getCashiers()
      if (result) setCashiers(result.data)
    }
    fetchCashiers()
  }, [getCashiers, setCashiers])

  return (
    <>
      <header className={styles.header}>
        <h1>Caixas</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={cashiers}
          titleColumn='name'
          rowClickable={row => history.push(`/cashier/${row.id}`)}
          emptyTableMessage='Não há caixas registrados.'
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default CashierList
