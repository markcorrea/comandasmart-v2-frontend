import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'

import {Paper, ProductSearch, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'

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
    removeProductsFromTicket,
    payProductsByTicketAndCashier,
  } = useServices()
  const {ticketId, cashierId} = useParams()
  const {showMenu, loading} = useStore()

  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await getTicketById(ticketId)
      if (result) setTicket(result)
    }

    fetchTicket(ticketId)
  }, [ticketId, getTicketById])

  const addProductByCode = useCallback(
    async uniqueCode => {
      const result = await addProductToTicketByCode(ticketId, uniqueCode)
      if (result) setTicket(result)
    },
    [ticketId, addProductToTicketByCode, setTicket]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      const result = await addProductsToTicketById(ticketId, product.id, quantity)
      if (result) setTicket(result)
    },
    [ticketId, addProductsToTicketById, setTicket]
  )

  const removeProducts = useCallback(
    async products => {
      const ids = products.map(product => product.id)
      const result = await removeProductsFromTicket(ticketId, ids)
      if (result) setTicket(result)
    },
    [ticketId, removeProductsFromTicket, setTicket]
  )

  const payProducts = useCallback(
    async products => {
      const ids = products.map(product => product.id)
      const result = await payProductsByTicketAndCashier(ticketId, cashierId, ids)
      if (result) setTicket(result)
    },
    [ticketId, cashierId, payProductsByTicketAndCashier, setTicket]
  )

  const tableButtons = [
    {
      label: 'Receber',
      onClick: selectedItems => payProducts(selectedItems),
    },
    {
      label: 'Remover',
      onClick: selectedItems => removeProducts(selectedItems),
      classes: {
        backgroundColor: 'red',
      },
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda - {ticket ? ticket.number.toString() : '--'}</h1>
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
            rows={(ticket && ticket.items) || []}
            titleColumn='name'
            hasCheckbox
            hasButtons={tableButtons}
            additionalRow={<TotalPrice ticket={ticket} />}
            emptyTableMessage='Não há produtos registrados.'
            disabled={loading}
          />
        </div>
      </Paper>
    </>
  )
}

export default CashierTicket
