import React, {useState, useEffect, useCallback} from 'react'
import {Paper, ResponsiveTable} from 'components'

import {useParams, useHistory} from 'react-router-dom'
import {useStore} from 'store'

import useServices from 'services'

import {lightGray} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const columns = [
  {
    key: 'uniqueCode',
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
    value: 'Preço',
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
      if (result) setCashier(result)
    }
    if (cashierId) fetchCashier()
  }, [cashierId, getCashierById, setCashier])

  const closeCashier = useCallback(async () => {
    const result = await closeCashierById(cashierId)
    if (result) history.push(`/cashier/${cashierId}/`)
  }, [cashierId, closeCashierById, history])

  const tableButtons = [
    {
      label: 'Fechar',
      onClick: () =>
        confirmationDialog({header: 'Fechar caixa', body: 'Confirma fechamento do caixa atual?', onConfirm: closeCashier}),
    },
    {
      label: 'Cancelar',
      onClick: () => history.push(`/cashier/${cashierId}/`),
      classes: {
        backgroundColor: lightGray,
      },
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <h1>Fechamento de Caixa</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.info}>
          <strong>Operador:</strong> {cashier?.user?.name || '-'} <br />
          <strong>Abertura:</strong> {cashier?.opened || '-'} <br />
          <strong>Fechamento:</strong> {cashier?.closed || '-'} <br />
        </div>
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={cashier?.products || []}
            titleColumn='name'
            hasButtons={tableButtons}
            additionalRow={<div className={styles.totalPrice}>{`Total: ${cashier?.totalValue || '-'}`}</div>}
            emptyTableMessage='Não há produtos registrados.'
          />
        </div>
      </Paper>
    </>
  )
}

export default CashierBalance
