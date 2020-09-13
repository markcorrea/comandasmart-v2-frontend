import React, {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'

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
  const {showMenu, setLoading, loading, confirmationDialog} = useStore()
  const history = useHistory()
  const {getProducts, deleteProductById} = useServices()

  const [products, setProducts] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  const tableButtons = [
    {
      label: 'Novo Produto',
      onClick: () => history.push(`/product/`),
    },
  ]

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts()
      if (result) setProducts(result)
    }
    fetchProducts()
  }, [getProducts, setProducts, setLoading])

  const deleteProduct = useCallback(
    async id => {
      const result = await deleteProductById(id)
      if (result) setProducts(result)
    },
    [deleteProductById, setProducts]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Produtos</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={products.data || []}
          titleColumn='name'
          onEditClick={row => history.push(`/product/${row.id}`)}
          onDeleteClick={row =>
            confirmationDialog({
              header: 'Excluir produto',
              body: `Deseja realmente excluir "${row.name}"?`,
              onConfirm: () => deleteProduct(row.id),
            })
          }
          rowClickable={row => history.push(`/product/${row.id}`)}
          emptyTableMessage='Não há produtos registrados.'
          loading={loading}
          pagination={{count: 0, page: 0, rowsPerPage: 0, onChangePage: () => {}}}
        />
        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </Paper>
    </>
  )
}

export default ProductList
