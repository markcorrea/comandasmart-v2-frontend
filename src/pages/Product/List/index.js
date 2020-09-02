import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import products from 'mocks/product'

import {useStore} from 'store'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'brand',
    value: 'Marca',
    textAlign: 'left',
  },
  {
    key: 'stock',
    value: 'Estoque',
  },
  {
    key: 'price',
    value: 'Preço',
  },
]

const ProductList = () => {
  const store = useStore()
  const history = useHistory()

  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Produtos</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={products.data}
          titleColumn='name'
          onEditClick={row => history.push(`/product/details/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => console.log('clickable row', row)}
          emptyTableMessage='Não há produtos registrados.'
        />
      </Paper>
    </>
  )
}

export default ProductList
