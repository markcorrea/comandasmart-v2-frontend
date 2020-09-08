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

  const [response, setResponse] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const result = await getProducts()
      if (result) {
        setResponse(result)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [getProducts, setResponse, setLoading])

  return (
    <>
      <header className={styles.header}>
        <h1>Produtos</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={response.data || []}
          titleColumn='name'
          onEditClick={row => history.push(`/product/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => history.push(`/product/${row.id}`)}
          emptyTableMessage='Não há produtos registrados.'
          loading={loading}
          pagination={{count: 0, page: 0, rowsPerPage: 0, onChangePage: () => {}}}
        />
      </Paper>
    </>
  )
}

export default ProductList
