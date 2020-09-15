import React, {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'

import {Paper, ProductCard, ProductSearch} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

const TicketDetails = () => {
  const {
    searchProductsByName,
    getTicketById,
    addProductToTicketByCode,
    addProductsToTicketById,
    removeProductFromTicket,
  } = useServices()
  const {showMenu, confirmationDialog} = useStore()
  const {ticketId} = useParams()

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
  }, [ticketId, getTicketById, setTicket])

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

  const removeProduct = useCallback(
    async productId => {
      const result = await removeProductFromTicket(ticketId, productId)
      if (result) setTicket(result)
    },
    [ticketId, removeProductFromTicket, setTicket]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda - {ticket ? ticket.number : '--'}</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProductsByName={searchProductsByName}
          onEnterPress={uniqueCode => addProductByCode(uniqueCode)}
          onConfirm={productData => addProductByClick(productData)}
        />
        {ticket && ticket.items.length ? (
          ticket.items.map((product, index) => (
            <div key={`item_${index}`} className={styles.flexCell}>
              <ProductCard
                product={product}
                onDeleteClick={() =>
                  confirmationDialog({
                    header: 'Remover produto',
                    body: `Deseja realmente remover "${product.name}?"`,
                    onConfirm: () => removeProduct(product.id),
                  })
                }
              />
            </div>
          ))
        ) : (
          <div className={styles.emptyTicket}>Não há itens na comanda atual.</div>
        )}
      </Paper>
    </>
  )
}

export default TicketDetails
