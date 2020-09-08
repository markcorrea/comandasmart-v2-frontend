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
  const {showMenu, setLoading, loading} = useStore()
  const history = useHistory()

  const {getProducts} = services

  const [products, setProducts] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const result = await getProducts()
      if (result) {
        setProducts(result.data)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [getProducts, setProducts, setLoading])

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
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default ProductList
