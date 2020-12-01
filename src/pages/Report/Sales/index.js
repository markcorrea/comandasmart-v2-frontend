import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'

import {Button, Datepicker, Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import formatMoney from 'utils/formatMoney'
import {dateToString} from 'utils/datetimeToString'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

// const today = new Date(new Date().setHours(12, 0))
// let lastMonth = new Date(new Date().setHours(12, 0))
const today = new Date()
let lastMonth = new Date()
lastMonth = new Date(lastMonth.setMonth(today.getMonth() - 1))

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'quantity',
    value: 'Quantidade',
    textAlign: 'left',
  },
  {
    key: 'price',
    value: 'Preço',
  },
]

const buttonMobileClass = {root: {minWidth: '20px', padding: '10px 15px 9px'}}

const ReportSales = () => {
  const {showMenu, loading} = useStore()
  const {getSalesReport} = useServices()

  const mediaMD = useMediaQuery('min', mediaQueryMD)

  const [dates, setDates] = useState({
    start_date: lastMonth,
    end_date: today,
  })
  const [products, setProducts] = useState({
    results: [],
    count: 0,
    rowsPerPage: 0,
  })
  const [validation, setValidation] = useState({
    valid: true,
    message: '',
  })

  const [page, setPage] = useState(1)

  const fetchProducts = useCallback(
    async ({start_date, end_date}, page) => {
      const result = await getSalesReport({start_date, end_date}, page)
      if (result) setProducts(prevProducts => ({...prevProducts, ...result.data}))
    },
    [getSalesReport, setProducts]
  )

  const loadMoreProducts = useCallback(
    async ({start_date, end_date}, page) => {
      const result = await getSalesReport({start_date, end_date}, page)
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
    [setProducts, getSalesReport]
  )

  const handleButtonClick = useCallback(
    ({start_date, end_date}, page) => {
      setPage(page)
      fetchProducts({start_date, end_date}, page)
    },
    [setPage, fetchProducts]
  )

  const onChangePage = useCallback(
    page => {
      if (validation.valid) {
        setPage(page)
        fetchProducts({start_date: dates.start_date, end_date: dates.end_date}, page)
      }
    },
    [setPage, fetchProducts, validation.valid, dates.start_date, dates.end_date]
  )

  const onLoadMore = useCallback(
    page => {
      if (validation.valid) {
        setPage(page)
        loadMoreProducts({start_date: dates.start_date, end_date: dates.end_date}, page)
      }
    },
    [setPage, loadMoreProducts, validation.valid, dates.start_date, dates.end_date]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    fetchProducts({start_date: lastMonth, end_date: today}, 1)
  }, [fetchProducts])

  useEffect(() => {
    if (!dates.start_date) {
      setValidation({valid: false, message: 'Data inicial é um campo obrigatório'})
    } else if (isNaN(dates.start_date.getTime())) {
      setValidation({valid: false, message: 'Formato de Data Inicial é inválido.'})
    } else if (!dates.end_date) {
      setValidation({valid: false, message: 'Data final é um campo obrigatório'})
    } else if (isNaN(dates.end_date.getTime())) {
      setValidation({valid: false, message: 'Formato de Data Final é inválido.'})
    } else if (dates.end_date.getTime() < dates.start_date.getTime()) {
      setValidation({valid: false, message: 'Data final não pode ser menor que data inicial.'})
    } else {
      setValidation({valid: true, message: ''})
    }
  }, [dates.start_date, dates.end_date, setValidation])

  const formattedProducts = useMemo(() => {
    if (products && products.results) {
      return products.results.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: formatMoney(parseFloat(item.price)),
      }))
    }
    return []
  }, [products])

  return (
    <>
      <header className={styles.header}>
        <h1>Relatório de Vendas</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.search}>
          <div className={styles.datepickers}>
            <Datepicker
              error={!validation.valid}
              className={styles.datepicker}
              label='Início'
              value={dates.start_date}
              helperText=''
              onChange={value => setDates(prevDates => ({...prevDates, start_date: value}))}
            />
            <Datepicker
              error={!validation.valid}
              className={styles.datepicker}
              label='Fim'
              value={dates.end_date}
              helperText=''
              onChange={value => setDates(prevDates => ({...prevDates, end_date: value}))}
            />
            <div className={styles.searchButton}>
              <Button
                disabled={!validation.valid}
                classes={!mediaMD ? buttonMobileClass : {}}
                onClick={() => handleButtonClick({start_date: dates.start_date, end_date: dates.end_date}, 1)}>
                {mediaMD ? 'Buscar' : <i className='fa fa-search' />}
              </Button>
            </div>
          </div>
          {!validation.valid ? (
            <div className={styles.validationMessage}>{validation.message}</div>
          ) : (
            <div className={styles.searchText}>
              Data inicial:
              <span className={styles.searchTerm}>&nbsp;{dateToString(dates.start_date)}</span>
              <br />
              Data final:
              <span className={styles.searchTerm}>&nbsp;{dateToString(dates.end_date)}</span>
            </div>
          )}
        </div>
        <ResponsiveTable
          columns={columns}
          rows={formattedProducts}
          titleColumn='name'
          emptyTableMessage='Não há produtos vendidos até o momento.'
          loading={loading}
          pagination={{count: products.count, page, onChangePage}}
          loadMore={{count: products.count, page, onLoadMore}}
        />
      </Paper>
    </>
  )
}

export default memo(ReportSales)
