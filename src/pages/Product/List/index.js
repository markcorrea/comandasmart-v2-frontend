import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useHistory} from 'react-router-dom'

import {Input, Paper, PlusButton, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'
import formatMoney from 'utils/formatMoney'

import useDebounce from 'utils/debounce'

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
  const {searchProductsByName, deleteProductById} = useServices()

  const [products, setProducts] = useState({
    results: [],
    count: 0,
    rowsPerPage: 0,
  })

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState({value: '', currentSearch: ''})

  const debouncedSearchTerm = useDebounce(search.value, 1000)

  const onInputChange = useCallback(value => setSearch(prevSearch => ({...prevSearch, value})), [setSearch])

  const searchProducts = useCallback(
    async (searchTerm, page) => {
      const result = await searchProductsByName(searchTerm, page)
      if (result) setProducts(prevProducts => ({...prevProducts, ...result.data}))
    },
    [searchProductsByName, setProducts]
  )

  const loadMoreProducts = useCallback(
    async page => {
      const result = await searchProductsByName(search.currentSearch, page)
      if (result) {
        setProducts(prevProducts => {
          return {
            ...prevProducts,
            ...result.data,
            results: [...prevProducts.results, ...result.data.results],
          }
        })
      }
    },
    [searchProductsByName, setProducts, search.currentSearch]
  )

  const deleteProduct = useCallback(
    async id => {
      const result = await deleteProductById(id)
      if (result) {
        searchProducts(search.currentSearch, 1)
        setPage(1)
      }
    },
    [deleteProductById, searchProducts, setPage, search.currentSearch]
  )

  const onChangePage = useCallback(
    page => {
      setPage(page)
      searchProducts(search.currentSearch, page)
    },
    [setPage, searchProducts, search.currentSearch]
  )

  const onLoadMore = useCallback(
    page => {
      setPage(page)
      loadMoreProducts(page)
    },
    [setPage, loadMoreProducts]
  )

  const callSearch = useCallback(
    searchTerm => {
      setSearch(prevSearch => ({...prevSearch, currentSearch: searchTerm}))
      searchProducts(searchTerm, 1)
      setPage(1)
    },
    [setSearch, setPage, searchProducts]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    callSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, callSearch])

  const formattedProducts = useMemo(() => {
    if (products && products.results) {
      return products.results.map(product => ({
        ...product,
        brand: product.brand || '-',
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
            value={search.value}
            onChange={event => onInputChange(event.target.value)}
            placeholder='Buscar por produto...'
            disabled={loading}
            label=''
            endIcon={
              <div className={styles.searchButton} onClick={!loading ? () => callSearch(search.value) : () => {}}>
                <i className='fa fa-search' />
              </div>
            }
          />
          <div className={styles.searchText}>
            Busca atual: <span className={styles.searchTerm}>{search.currentSearch || 'Todos os produtos'}</span>
          </div>
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
          pagination={{count: products.count, page, onChangePage}}
          loadMore={{count: products.count, page, onLoadMore}}
        />
      </Paper>
      <div className={styles.plusButtonContainer}>
        <PlusButton onClick={() => history.push(`/product/`)} />
      </div>
    </>
  )
}

export default memo(ProductList)
