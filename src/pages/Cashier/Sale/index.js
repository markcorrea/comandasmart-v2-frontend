import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import {Paper, ProductSearch, ResponsiveTable} from 'components'

import {useParams, useHistory} from 'react-router-dom'
import {useStore} from 'store'
import formatMoney from 'utils/formatMoney'

import useServices from 'services'

import styles from './index.module.scss'

const TotalPrice = ({products}) => {
  const sum = products.reduce((acc, {price, quantity}) => {
    return acc + parseFloat(price * quantity)
  }, 0)

  return <div className={styles.totalPrice}>{`Total: R$${sum.toFixed(2)}`}</div>
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
  const {searchProductsByName, searchProductByCode, quickSale} = useServices()

  const {showMenu} = useStore()
  const {cashierId} = useParams()
  const history = useHistory()

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const [products, setProducts] = useState([])

  const addProductByCode = useCallback(
    async (uniqueCode, inputToFocus = null) => {
      const result = await searchProductByCode(uniqueCode)
      if (result) {
        let newProduct = result.data
        setProducts(prevProducts => {
          const index = prevProducts.findIndex(product => product.id === newProduct.id)
          if (index >= 0) {
            const updatedProducts = [...prevProducts]
            updatedProducts[index].quantity++
            return updatedProducts
          }

          const maxIndex = getMaxIndex(prevProducts)
          newProduct = {...newProduct, quantity: 1, index: maxIndex + 1}
          if (inputToFocus) inputToFocus.current.focus()
          return [...prevProducts, newProduct]
        })
      }
    },
    [searchProductByCode, setProducts]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      setProducts(prevProducts => {
        const index = prevProducts.findIndex(item => product.id === item.id)
        if (index >= 0) {
          const updatedProducts = [...prevProducts]
          updatedProducts[index].quantity += quantity
          return updatedProducts
        }

        const maxIndex = getMaxIndex(prevProducts)
        const newProduct = {...product, quantity, index: maxIndex + 1}
        return [...prevProducts, newProduct]
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
      products = products.map(product => ({product: product.id.toString(), quantity: product.quantity}))
      const result = await quickSale({cashier: cashierId, products})
      if (result) history.push(`/cashier/${cashierId}`)
    },
    [cashierId, quickSale, history]
  )

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
      key: 'unit_price',
      value: 'Valor Unitário',
    },
    {
      key: 'quantity',
      value: 'Quantidade',
    },
    {
      key: 'price',
      value: 'Total',
      custom: ({price, quantity}) => formatMoney(parseFloat(price * quantity)),
    },
  ]

  const tableButtons = [
    {
      label: 'Receber',
      onClick: products => payProducts(products),
    },
  ]

  const formattedProducts = useMemo(() => {
    if (products) {
      return products.map(product => ({
        ...product,
        unit_price: formatMoney(parseFloat(product.price)),
      }))
    }
    return []
  }, [products])

  return (
    <>
      <header className={styles.header}>
        <h1>Registrar venda</h1>
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
            rows={formattedProducts}
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

export default memo(CashierSale)
