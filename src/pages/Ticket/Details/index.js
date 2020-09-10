import React, {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'

import {Paper, ProductCard, ProductSearch} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

const TicketDetails = () => {
  const {searchProducts, getTicketById, addProductsToTicketByCode, addProductsToTicketById} = useServices()
  const {showMenu} = useStore()
  const {ticketId} = useParams()

  const [products, setProducts] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await getTicketById(ticketId)
      if (result && result.items.length) setProducts(result.items)
    }

    fetchTicket(ticketId)
  }, [ticketId, getTicketById, setProducts])

  const addProductByCode = useCallback(
    async uniqueCode => {
      const result = await addProductsToTicketByCode(ticketId, uniqueCode)
      if (result) setProducts(result.items)
    },
    [ticketId, addProductsToTicketByCode, setProducts]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      const result = await addProductsToTicketById(ticketId, product.id, quantity)
      if (result) setProducts(result.items)
    },
    [ticketId, addProductsToTicketById, setProducts]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda 450</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProducts={searchProducts}
          onEnterPress={uniqueCode => addProductByCode(uniqueCode)}
          onConfirm={productData => addProductByClick(productData)}
        />
        {products.length ? (
          products.map((product, index) => (
            <div key={`item_${index}`} className={styles.flexCell}>
              <ProductCard product={product} onDeleteClick={() => console.log('delete')} />
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
