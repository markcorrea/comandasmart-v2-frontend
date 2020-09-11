import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Paper, ProductSearch, ResponsiveTable} from 'components'

import {useParams, useHistory} from 'react-router-dom'
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

const TotalPrice = ({products}) => {
  const sum = products.length ? products.reduce((item, {price}) => item + price, 0) : 0

  return <div className={styles.totalPrice}>{`Total: ${sum}`}</div>
}

TotalPrice.propTypes = {
  products: PropTypes.array,
}

const getMaxIndex = array => {
  if (array.length) {
    return Math.max.apply(
      null,
      array.map(item => item.index)
    )
  }

  return 0
}

const CashierSale = () => {
  const {searchProducts, getProductByCode, payProductsByCashier} = useServices()

  const {showMenu} = useStore()
  const {cashierId} = useParams()
  const history = useHistory()

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const [products, setProducts] = useState([])

  const addProductByCode = useCallback(
    async uniqueCode => {
      const result = await getProductByCode(uniqueCode)
      if (result) {
        setProducts(prevProducts => {
          const index = getMaxIndex(prevProducts)
          const newProduct = {...result.data, index: index + 1}
          return [...prevProducts, newProduct]
        })
      }
    },
    [getProductByCode, setProducts]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      setProducts(prevProducts => {
        let index = getMaxIndex(prevProducts)

        const newProducts = Array.from({length: quantity}).map(() => {
          index++
          const newProduct = {...product, index: index}
          return newProduct
        })

        return [...prevProducts, ...newProducts]
      })
    },
    [setProducts]
  )

  const removeProduct = useCallback(
    product => {
      setProducts(prevProducts => prevProducts.filter(item => item.index !== product.index))
    },
    [setProducts]
  )

  const payProducts = useCallback(
    async products => {
      const ids = products.map(product => product.id)
      const result = await payProductsByCashier(cashierId, ids)
      if (result) history.push(`/cashier/${cashierId}`)
    },
    [cashierId, payProductsByCashier, history]
  )

  const tableButtons = [
    {
      label: 'Receber',
      onClick: products => payProducts(products),
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <h1>Registrar venda</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProducts={searchProducts}
          onEnterPress={uniqueCode => addProductByCode(uniqueCode)}
          onConfirm={productData => addProductByClick(productData)}
        />
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={products}
            titleColumn='name'
            onDeleteClick={row => removeProduct(row)}
            hasButtons={tableButtons}
            additionalRow={<TotalPrice products={products} />}
            emptyTableMessage='Não há produtos registrados.'
          />
        </div>
      </Paper>
    </>
  )
}

export default CashierSale
