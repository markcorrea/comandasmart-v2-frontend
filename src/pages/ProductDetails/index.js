import React, {useCallback, useEffect, useState, useMemo, memo} from 'react'
import {useParams} from 'react-router-dom'

import {Paper} from 'components'
import {useStore} from 'store'
import ProductForm from 'forms/ProductForm'

import productResponse from 'mocks/product'
import terminalsResponse from 'mocks/terminal'

import styles from './index.module.scss'

const ProductDetails = () => {
  const store = useStore()
  const {productId} = useParams()

  const [product, setProduct] = useState({})

  const terminals = useMemo(() => terminalsResponse.data.map(terminal => ({...terminal, value: terminal.id})), [])

  const fetchProduct = useCallback(id => {
    const result = productResponse.data.find(item => item.id === id)
    return result
  }, [])

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    if (productId && productId !== product.id) {
      const newProduct = fetchProduct(productId)
      setProduct(newProduct)
    }
  }, [product, fetchProduct, setProduct, productId])

  return (
    <>
      <header className={styles.header}>
        <h1>{productId ? 'Editar' : 'Criar'} Produto</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductForm product={product} terminals={terminals} onSubmit={data => console.log('SUBMIT', data)} />
      </Paper>
    </>
  )
}

export default memo(ProductDetails)
