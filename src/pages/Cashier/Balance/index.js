import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {Paper, ResponsiveTable} from 'components'

import {useParams, useHistory} from 'react-router-dom'
import {useStore} from 'store'

import useServices from 'services'

import {datetimeToString} from 'utils/datetimeToString'
import formatMoney from 'utils/formatMoney'

import styles from './index.module.scss'

const columns = [
  {
    key: 'unique_code',
    value: 'Código',
    textAlign: 'left',
  },
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'price',
    value: 'Valor',
    textAlign: 'left',
  },
  {
    key: 'quantity',
    value: 'Quantidade',
    textAlign: 'right',
  },
  {
    key: 'total_price',
    value: 'Valor Total',
  },
]

const CashierBalance = () => {
  const {getCashierById, closeCashierById} = useServices()

  const {showMenu, confirmationDialog} = useStore()
  const {cashierId} = useParams()
  const history = useHistory()
  const [cashier, setCashier] = useState(null)

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchCashier = async () => {
      const result = await getCashierById(cashierId)
      if (result) setCashier({...result.data})
    }
    if (cashierId) fetchCashier()
  }, [cashierId, getCashierById, setCashier])

  const closeCashier = useCallback(async () => {
    const close_date = new Date()
    const result = await closeCashierById({id: cashierId, close_date})
    if (result) history.push(`/cashier/${cashierId}/`)
  }, [cashierId, closeCashierById, history])

  const tableButtons = [
    {
      label: 'Fechar Caixa',
      onClick: () =>
        confirmationDialog({header: 'Fechar caixa', body: 'Confirma fechamento do caixa atual?', onConfirm: closeCashier}),
    },
  ]

  const formattedOrders = useMemo(() => {
    if (cashier && cashier.sales) {
      return cashier.sales.map(sale => ({
        unique_code: sale.product.unique_code,
        name: sale.product.name,
        price: formatMoney(parseFloat(sale.product.price)),
        quantity: sale.quantity,
        total_price: formatMoney(parseFloat(sale.price)),
      }))
    }
    return []
  }, [cashier])

  return (
    <>
      <header className={styles.header}>
        <h1> Controle de Caixa</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.info}>
          <strong>Operador:</strong> {cashier?.user?.first_name || '-'} <br />
          <strong>Abertura:</strong> {(cashier?.created && datetimeToString(cashier.created)) || '-'} <br />
          <strong>Fechamento:</strong> {(cashier?.close_date && datetimeToString(cashier.close_date)) || '-'} <br />
        </div>
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={formattedOrders}
            titleColumn='name'
            hasButtons={tableButtons}
            additionalRow={
              <div className={styles.totalPrice}>{`Total: ${(cashier && formatMoney(parseFloat(cashier.total_price))) ||
                '-'}`}</div>
            }
            emptyTableMessage='Não há produtos registrados.'
          />
        </div>
      </Paper>
    </>
  )
}

export default memo(CashierBalance)
