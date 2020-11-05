import React, {useState, useEffect, useRef, useCallback, useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import {useParams, useHistory} from 'react-router-dom'

import {Modal, NumberInput, Paper, ProductSearch, ResponsiveTable} from 'components'
import PartialSaleModalBody from './PartialSaleModalBody'

import formatMoney from 'utils/formatMoney'

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
    value: 'Preço Unitário',
  },
  {
    key: 'quantity',
    value: 'Quantidade',
  },
  {
    key: 'total',
    value: 'Total',
  },
]

const ModalDelete = ({order, quantityToDelete, setQuantityToDelete}) => {
  const ref = useRef('')
  const focus = () => ref.current.focus()

  useEffect(() => focus(), [])

  const isValid =
    quantityToDelete && quantityToDelete !== '' && quantityToDelete > 0 && order && quantityToDelete <= order.quantity

  return (
    <div className={styles.modalBody}>
      <NumberInput ref={ref} label={''} value={quantityToDelete} onChange={setQuantityToDelete} />
      {!isValid && <span className={styles.codeWarning}>Mínimo de 1 produto e máximo de {order ? order.quantity : 1}.</span>}
    </div>
  )
}

ModalDelete.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  quantityToDelete: PropTypes.number,
  setQuantityToDelete: PropTypes.func,
}

const TotalPrice = ({ticket}) => (
  <div className={styles.totalPrice}>{`Total: ${(ticket && formatMoney(parseFloat(ticket.total_price))) || 0}`}</div>
)

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(false)
  const [quantityToDelete, setQuantityToDelete] = useState(1)
  const [openPartialSaleModal, setOpenPartialSaleModal] = useState(false)

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

  const payOrders = useCallback(
    async orders => {
      orders = orders.map(order => ({order: order.id, quantity: order.quantity_selected || 0}))
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
      onClick: () => setOpenPartialSaleModal(true),
    },
  ]

  const removeOrder = useCallback(async () => {
    if (!quantityToDelete || quantityToDelete === '' || quantityToDelete < 1 || quantityToDelete > itemToDelete.quantity) return
    const result = await removeOrdersByTicketAndCashier({ticket: ticketId, order: itemToDelete.id, quantity: quantityToDelete})
    if (result) {
      setTicket({...result.data})
      setDeleteModalOpen(false)
      setItemToDelete(null)
      setQuantityToDelete(1)
    }
  }, [
    ticketId,
    itemToDelete,
    quantityToDelete,
    setDeleteModalOpen,
    setQuantityToDelete,
    setItemToDelete,
    removeOrdersByTicketAndCashier,
    setTicket,
  ])

  const openDeleteModal = useCallback(
    order => {
      setDeleteModalOpen(true)
      setItemToDelete(order)
    },
    [setDeleteModalOpen, setItemToDelete]
  )

  const formattedOrders = useMemo(() => {
    if (!ticket?.orders) return []
    return ticket.orders.map(order => ({
      id: order.id,
      unique_code: order.product.unique_code,
      name: order.product.name,
      quantity: order.quantity,
      price: formatMoney(parseFloat(order.product.price)),
      total: formatMoney(parseFloat(order.price)),
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
            onDeleteClick={order => openDeleteModal(order)}
            additionalRow={<TotalPrice ticket={ticket} />}
            emptyTableMessage='Não há produtos registrados.'
            disabled={loading}
          />
        </div>
      </Paper>
      <Modal
        header='Selecione a quantidade a ser removida.'
        onConfirm={removeOrder}
        onCancel={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}>
        <ModalDelete
          order={itemToDelete}
          quantityToDelete={quantityToDelete}
          setQuantityToDelete={value => setQuantityToDelete(value)}
        />
      </Modal>
      <Modal maxWidth='lg' header='Selecione os itens a serem vendidos' open={openPartialSaleModal}>
        <PartialSaleModalBody
          orders={(ticket && ticket.orders) || []}
          onConfirm={ordersToSell => payOrders(ordersToSell)}
          onCancel={() => setOpenPartialSaleModal(false)}
        />
      </Modal>
    </>
  )
}

export default memo(CashierTicket)
