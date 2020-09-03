import React, {useState, useEffect, memo} from 'react'
import PropTypes from 'prop-types'
import {Paper, ProductSearch, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

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

const tableButtons = [
  {
    label: 'Receber',
    onClick: selectedItems => console.log('PURCHASING', selectedItems),
  },
  {
    label: 'Remover',
    onClick: selectedItems => console.log('DELETING', selectedItems),
    classes: {
      backgroundColor: 'red',
    },
  },
]

const TotalPrice = ({products}) => {
  const sum = products.length ? products.reduce((item, {price}) => item + price, 0) : 0

  return <div className={styles.totalPrice}>{`Total: ${sum}`}</div>
}

TotalPrice.propTypes = {
  products: PropTypes.array,
}

const CashierSale = () => {
  const {searchProducts} = services

  const store = useStore()

  useEffect(() => {
    store.showMenu()
  }, [store])

  const [products, setProducts] = useState([])

  return (
    <>
      <header className={styles.header}>
        <h1>Registrar venda</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProducts={searchProducts}
          onEnterPress={message => setProducts([])}
          onConfirm={() => console.log('confirming')}
        />
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={products}
            titleColumn='name'
            hasCheckbox
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
