import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

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

  const {getProducts} = services

  const [products, setProducts] = useState([])

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts()
      if (result) {
        setProducts(result.data)
      }
    }
    fetchProducts()
  }, [getProducts, setProducts])

  return (
    <>
      <header className={styles.header}>
        <h1>Produtos</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={products}
          titleColumn='name'
          onEditClick={row => history.push(`/product/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => history.push(`/product/${row.id}`)}
          emptyTableMessage='Não há produtos registrados.'
        />
      </Paper>
    </>
  )
}

export default ProductList
