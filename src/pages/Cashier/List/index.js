import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable, SpeedDial} from 'components'

import useServices from 'services'

import {useStore} from 'store'

import {datetimeToString} from 'utils/datetimeToString'

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
    key: 'total_value',
    value: 'Valor Total',
    textAlign: 'left',
  },
]

const CashierList = () => {
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const {getCashiers, openCashier} = useServices()

  const [cashiers, setCashiers] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchCashiers = async () => {
      const result = await getCashiers()
      if (result) setCashiers([...result.data])
    }
    fetchCashiers()
  }, [getCashiers, setCashiers])

  const openNewCashier = useCallback(async () => {
    const result = await openCashier()
    if (result) history.push(`/cashier/${result.data.id}/`)
  }, [history, openCashier])

  const speedDialButtons = useMemo(
    () => [
      {
        label: 'Novo Caixa',
        onClick: () =>
          confirmationDialog({
            header: 'Abrir caixa',
            body: `Deseja abrir novo caixa com o usuário atual?`,
            onConfirm: openNewCashier,
          }),
      },
    ],
    [openNewCashier, confirmationDialog]
  )

  const formattedCashiers = useMemo(() => {
    return cashiers.map(cashier => {
      return {
        id: cashier.id,
        name: cashier?.user?.first_name || '-',
        opened: cashier.created ? datetimeToString(cashier.created) : '-',
        closed: cashier.close_date ? datetimeToString(cashier.closeDate) : '-',
        total_value: cashier.total_price,
      }
    })
  }, [cashiers])

  return (
    <>
      <header className={styles.header}>
        <h1>Caixas</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={formattedCashiers}
          titleColumn='name'
          onViewClick={row => history.push(`/cashier/${row.id}`)}
          rowClickable={row => history.push(`/cashier/${row.id}`)}
          emptyTableMessage='Não há caixas registrados.'
          loading={loading}
        />
      </Paper>
      <div className={styles.speedDialContainer}>
        <SpeedDial buttons={speedDialButtons} />
      </div>
    </>
  )
}

export default memo(CashierList)
