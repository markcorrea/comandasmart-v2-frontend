import React, {useState, useEffect, useMemo, memo} from 'react'

import {Paper, ResponsiveTable} from 'components'

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
  {
    key: 'sold',
    value: 'Vendidos',
  },
]

const ReportMostSold = () => {
  const {showMenu, loading} = useStore()
  const {getMostSoldProducts} = useServices()

  const [products, setProducts] = useState({
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
      const result = await getMostSoldProducts()
      if (result) setProducts(result)
    }
    fetchProducts()
  }, [getMostSoldProducts, setProducts])

  const formattedProducts = useMemo(() => {
    if (products && products.data) {
      return products.data.map(product => ({
        ...product,
        price: formatMoney(product.price),
      }))
    }
    return []
  }, [products])

  return (
    <>
      <header className={styles.header}>
        <h1>Produtos Mais Vendidos</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={formattedProducts}
          titleColumn='name'
          emptyTableMessage='Não há produtos vendidos até o momento.'
          loading={loading}
          pagination={{count: 0, page: 0, rowsPerPage: 0, onChangePage: () => {}}}
        />
      </Paper>
    </>
  )
}

export default memo(ReportMostSold)
