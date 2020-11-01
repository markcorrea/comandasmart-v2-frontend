import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Input, Paper, PlusButton, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'
import formatMoney from 'utils/formatMoney'

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
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()
  const {searchProductsByName, getProducts, deleteProductById} = useServices()

  const [products, setProducts] = useState({
    data: [],
    count: 0,
    page: 0,
    rowsPerPage: 0,
  })

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts()
      if (result) setProducts(result.data)
    }
    fetchProducts()
  }, [getProducts, setProducts])

  const deleteProduct = useCallback(
    async id => {
      const result = await deleteProductById(id)
      if (result) {
        const newProducts = await getProducts()
        if (newProducts) {
          setProducts(newProducts.data)
        }
      }
    },
    [deleteProductById, setProducts, getProducts]
  )

  const searchProducts = useCallback(async () => {
    if (searchTerm) {
      const result = await searchProductsByName(searchTerm)
      if (result) setProducts({data: result})
    }
  }, [searchProductsByName, setProducts, searchTerm])

  const handleKeyPress = useCallback(
    event => {
      if (event.key === 'Enter') searchProducts()
    },
    [searchProducts]
  )

  const formattedProducts = useMemo(() => {
    if (products && products.data) {
      return products.data.map(product => ({
        ...product,
        price: formatMoney(parseFloat(product.price)),
      }))
    }
    return []
  }, [products])

  return (
    <>
      <header className={styles.header}>
        <h1>Produtos</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.search}>
          <Input
            onKeyPress={handleKeyPress}
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder='Buscar por produto...'
            disabled={loading}
            label=''
            endIcon={
              <div className={styles.searchButton} onClick={!loading ? searchProducts : () => {}}>
                <i className='fa fa-search' />
              </div>
            }
          />
        </div>
        <ResponsiveTable
          columns={columns}
          rows={formattedProducts}
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
          pagination={{count: 0, page: 0, rowsPerPage: 10, onChangePage: () => {}}}
        />
      </Paper>
      <div className={styles.plusButtonContainer}>
        <PlusButton onClick={() => history.push(`/product/`)} />
      </div>
    </>
  )
}

export default memo(ProductList)
