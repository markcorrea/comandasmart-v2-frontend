import React, {useEffect, useState, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

import {Paper} from 'components'
import {useStore} from 'store'
import ProductForm from 'forms/ProductForm'

import useServices from 'services'

import styles from './index.module.scss'

const unitTypes = [
  {
    name: 'KG',
    value: 'KG',
  },
  {
    name: 'L',
    value: 'L',
  },
  {
    name: 'U',
    value: 'U',
  },
]

const ProductDetails = () => {
  const {showMenu, loading} = useStore()
  const {productId} = useParams()
  const history = useHistory()
  const {getTerminals, getProductById, saveProduct} = useServices()

  const [product, setProduct] = useState({})
  const [terminals, setTerminals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const terminalResponse = await getTerminals()
      if (terminalResponse) {
        const adjustedTerminals = terminalResponse.data.map(item => ({...item, value: item.id}))
        setTerminals(adjustedTerminals)
      }

      if (productId) {
        const productResponse = await getProductById(productId)
        if (productResponse) setProduct(productResponse.data)
      }
    }

    fetchData()
  }, [productId, getTerminals, getProductById, setTerminals, setProduct])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const postProduct = useCallback(
    async body => {
      const payload = {
        ...body,
        ...(productId ? {id: productId} : {}),
      }
      const result = await saveProduct(payload)
      if (result) history.push(`/products`)
    },
    [productId, saveProduct, history]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>{productId ? 'Editar' : 'Criar'} Produto</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductForm
          product={product}
          terminals={terminals}
          unitTypes={unitTypes}
          onSubmit={data => postProduct(data)}
          onCancel={() => history.push('/products')}
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default ProductDetails
