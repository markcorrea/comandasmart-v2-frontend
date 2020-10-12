import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import {useParams, useHistory} from 'react-router-dom'

import {Paper, ProductSearch, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'

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
    value: 'Preço',
  },
  {
    key: 'quantity',
    value: 'Quantidade',
  },
]

const TotalPrice = ({ticket}) => <div className={styles.totalPrice}>{`Total: ${(ticket && ticket.price) || 0}`}</div>

TotalPrice.propTypes = {
  ticket: PropTypes.object,
}

const CashierTicket = () => {
  const {
    searchProductsByName,
    getTicketById,
    addProductToTicketByCode,
    addProductsToTicketById,
    payOrdersByTicketAndCashier,
    payAllOrdersAndCloseTicket,
    removeOrdersByTicketAndCashier,
  } = useServices()
  const {ticketId, cashierId} = useParams()
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await getTicketById(ticketId)
      if (result) setTicket({...result.data})
    }

    fetchTicket(ticketId)
  }, [ticketId, getTicketById])

  const addProductByCode = useCallback(
    async code => {
      const result = await addProductToTicketByCode({ticket: ticketId, code})
      if (result) setTicket({...result.data})
    },
    [ticketId, addProductToTicketByCode, setTicket]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      const result = await addProductsToTicketById({ticket: ticketId, product: product.id, quantity})
      if (result) setTicket({...result.data})
    },
    [ticketId, addProductsToTicketById, setTicket]
  )

  const removeOrder = useCallback(
    async order => {
      const result = await removeOrdersByTicketAndCashier({ticket: ticketId, order: order.id, quantity: order.quantity})
      if (result) setTicket({...result.data})
    },
    [ticketId, removeOrdersByTicketAndCashier, setTicket]
  )

  const payOrders = useCallback(
    async orders => {
      orders = orders.map(order => ({order: order.id, quantity: order.quantity}))
      const result = await payOrdersByTicketAndCashier({ticket: ticketId, cashier: cashierId, orders})
      if (result) setTicket({...result.data})
    },
    [ticketId, cashierId, payOrdersByTicketAndCashier, setTicket]
  )

  const closeTicket = useCallback(async () => {
    const result = await payAllOrdersAndCloseTicket({ticket: ticketId, cashier: cashierId})
    if (result) history.push(`/cashier/${cashierId}`)
  }, [history, ticketId, cashierId, payAllOrdersAndCloseTicket])

  const tableButtons = [
    {
      label: 'Fechar Comanda',
      onClick: () =>
        confirmationDialog({
          header: 'Fechar Comanda',
          body: `Deseja realmente encerrar comanda ${ticketId}?`,
          onConfirm: () => closeTicket(),
        }),
    },
    {
      label: 'Fechar Parcialmente',
      onClick: orders =>
        confirmationDialog({
          header: 'Concluir Venda',
          body: `Confirma venda dos valores selecionados?`,
          onConfirm: () => payOrders(orders),
        }),
    },
  ]

  const formattedOrders = useMemo(() => {
    if (!ticket?.orders) return []
    return ticket.orders.map(order => ({
      id: order.id,
      unique_code: order.product.unique_code,
      name: order.product.name,
      quantity: 1,
      price: order.product.price,
    }))
  }, [ticket])

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda - {ticket?.unique_code || '--'}</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProductsByName={searchProductsByName}
          onEnterPress={uniqueCode => addProductByCode(uniqueCode)}
          onConfirm={productData => addProductByClick(productData)}
        />
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={formattedOrders}
            titleColumn='name'
            hasButtons={tableButtons}
            onDeleteClick={order => removeOrder(order)}
            additionalRow={<TotalPrice ticket={ticket} />}
            emptyTableMessage='Não há produtos registrados.'
            disabled={loading}
          />
        </div>
      </Paper>
    </>
  )
}

export default memo(CashierTicket)
