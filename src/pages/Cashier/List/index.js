import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, PlusButton, ResponsiveTable} from 'components'

import useServices from 'services'

import {useStore} from 'store'

import {datetimeToString} from 'utils/datetimeToString'

import formatMoney from 'utils/formatMoney'

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

  const [cashiers, setCashiers] = useState({
    results: [],
    count: 0,
    rowsPerPage: 0,
  })

  const [page, setPage] = useState(1)

  const fetchCashiers = useCallback(
    async page => {
      const result = await getCashiers(page)
      if (result) setCashiers(prevCashiers => ({...prevCashiers, ...result.data}))
    },
    [getCashiers, setCashiers]
  )

  const loadMoreCashiers = useCallback(
    async page => {
      const result = await getCashiers(page)
      if (result) {
        setCashiers(prevCashiers => {
          return {
            ...prevCashiers,
            ...result.data,
            results: [...prevCashiers.results, ...result.data.results],
          }
        })
      }
    },
    [getCashiers, setCashiers]
  )

  const openNewCashier = useCallback(async () => {
    const result = await openCashier()
    if (result) history.push(`/cashier/${result.data.id}/`)
  }, [history, openCashier])

  const onChangePage = useCallback(
    page => {
      setPage(page)
      fetchCashiers(page)
    },
    [setPage, fetchCashiers]
  )

  const onLoadMore = useCallback(
    page => {
      setPage(page)
      loadMoreCashiers(page)
    },
    [setPage, loadMoreCashiers]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    fetchCashiers()
  }, [fetchCashiers])

  const formattedCashiers = useMemo(() => {
    if (cashiers && cashiers.results) {
      return cashiers.results.map(cashier => {
        return {
          id: cashier.id,
          name: cashier?.user?.first_name || '-',
          opened: cashier.created ? datetimeToString(cashier.created) : '-',
          closed: cashier.close_date ? datetimeToString(cashier.close_date) : '-',
          total_value: formatMoney(parseFloat(cashier.total_price)),
        }
      })
    }
    return []
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
          pagination={{count: cashiers.count, page, onChangePage}}
          loadMore={{count: cashiers.count, page, onLoadMore}}
        />
      </Paper>
      <div className={styles.plusButtonContainer}>
        <PlusButton
          onClick={() =>
            confirmationDialog({
              header: 'Abrir caixa',
              body: `Deseja abrir novo caixa com o usuário atual?`,
              onConfirm: openNewCashier,
            })
          }
        />
      </div>
    </>
  )
}

export default memo(CashierList)
