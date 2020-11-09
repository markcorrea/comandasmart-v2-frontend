import React, {useState, useEffect, useCallback, useRef, useMemo, memo} from 'react'
import PropTypes from 'prop-types'
import {Modal, NumberInput, Paper, ProductSearch, ResponsiveTable} from 'components'

import {useParams, useHistory} from 'react-router-dom'
import {useStore} from 'store'
import formatMoney from 'utils/formatMoney'

import useServices from 'services'

import styles from './index.module.scss'

const TotalPrice = ({products}) => {
  const sum = products.reduce((acc, {price, quantity}) => {
    return acc + parseFloat(price * quantity)
  }, 0)

  return <div className={styles.totalPrice}>{`Total: R$${sum.toFixed(2)}`}</div>
}

TotalPrice.propTypes = {
  products: PropTypes.array,
}

const ModalDelete = ({product, quantityToDelete, setQuantityToDelete}) => {
  const ref = useRef('')
  const focus = () => ref.current.focus()

  useEffect(() => focus(), [])

  const isValid =
    quantityToDelete && quantityToDelete !== '' && quantityToDelete > 0 && product && quantityToDelete <= product.quantity

  return (
    <div className={styles.modalBody}>
      <NumberInput ref={ref} label={''} value={quantityToDelete} onChange={setQuantityToDelete} />
      {!isValid && <span className={styles.codeWarning}>Mínimo de 1 produto e máximo de {product ? product.quantity : 1}.</span>}
    </div>
  )
}

ModalDelete.propTypes = {
  product: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  quantityToDelete: PropTypes.number,
  setQuantityToDelete: PropTypes.func,
}

const getMaxIndex = array => {
  if (array.length) {
    return Math.max.apply(
      null,
      array.map(item => item.index)
    )
  }
  return 0
}

const CashierSale = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [quantityToDelete, setQuantityToDelete] = useState(null)

  const {searchProductsByName, searchProductByCode, quickSale} = useServices()

  const {showMenu} = useStore()
  const {cashierId} = useParams()
  const history = useHistory()

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const [products, setProducts] = useState([])

  const addProductByCode = useCallback(
    async (uniqueCode, inputToFocus = null) => {
      const result = await searchProductByCode(uniqueCode)
      if (result) {
        let newProduct = result.data.product
        const quantity = result.data.quantity
        setProducts(prevProducts => {
          const index = prevProducts.findIndex(product => product.id === newProduct.id)
          if (index >= 0) {
            const updatedProducts = [...prevProducts]
            updatedProducts[index].quantity += quantity
            return updatedProducts
          }

          const maxIndex = getMaxIndex(prevProducts)
          newProduct = {...newProduct, quantity, index: maxIndex + 1}
          if (inputToFocus) inputToFocus.current.focus()
          return [...prevProducts, newProduct]
        })
      }
    },
    [searchProductByCode, setProducts]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      setProducts(prevProducts => {
        const index = prevProducts.findIndex(item => product.id === item.id)
        if (index >= 0) {
          const updatedProducts = [...prevProducts]
          updatedProducts[index].quantity += quantity
          return updatedProducts
        }

        const maxIndex = getMaxIndex(prevProducts)
        const newProduct = {...product, quantity, index: maxIndex + 1}
        return [...prevProducts, newProduct]
      })
    },
    [setProducts]
  )

  const removeProduct = useCallback(async () => {
    if (!quantityToDelete || quantityToDelete === '' || quantityToDelete < 1 || quantityToDelete > itemToDelete.quantity) return

    setProducts(prevProducts => {
      const index = prevProducts.findIndex(item => itemToDelete.id === item.id)
      if (index >= 0) {
        const updatedProducts = [...prevProducts]

        if (updatedProducts[index].quantity === quantityToDelete) {
          updatedProducts.filter(item => item.id !== updatedProducts[index].id)
        } else {
          updatedProducts[index].quantity -= quantityToDelete
        }

        return updatedProducts
      }
    })

    setDeleteModalOpen(false)
    setItemToDelete(null)
    setQuantityToDelete(1)
  }, [itemToDelete, quantityToDelete, setDeleteModalOpen, setItemToDelete])

  const openDeleteModal = useCallback(
    product => {
      setDeleteModalOpen(true)
      setItemToDelete(product)
    },
    [setDeleteModalOpen, setItemToDelete]
  )

  const payProducts = useCallback(
    async products => {
      products = products.map(product => ({product: product.id.toString(), quantity: product.quantity}))
      const result = await quickSale({cashier: cashierId, products})
      if (result) history.push(`/cashier/${cashierId}`)
    },
    [cashierId, quickSale, history]
  )

  const columns = [
    {
      key: 'unique_code',
      value: 'Código',
      textAlign: 'left',
    },
    {
      key: 'name',
      value: 'Nome',
      textAlign: 'left',
    },
    {
      key: 'unit_price',
      value: 'Valor Unitário',
    },
    {
      key: 'quantity',
      value: 'Quantidade',
    },
    {
      key: 'price',
      value: 'Total',
      custom: ({price, quantity}) => formatMoney(parseFloat(price * quantity)),
    },
  ]

  const tableButtons = [
    {
      label: 'Receber',
      onClick: products => payProducts(products),
    },
  ]

  const formattedProducts = useMemo(() => {
    if (products) {
      return products.map(product => ({
        ...product,
        unit_price: formatMoney(parseFloat(product.price)),
      }))
    }
    return []
  }, [products])

  return (
    <>
      <header className={styles.header}>
        <h1>Registrar venda</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProductsByName={searchProductsByName}
          onEnterPress={uniqueCode => addProductByCode(uniqueCode)}
          onConfirm={productData => addProductByClick(productData)}
        />
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={formattedProducts}
            titleColumn='name'
            onDeleteClick={product => openDeleteModal(product)}
            hasButtons={tableButtons}
            additionalRow={<TotalPrice products={products} />}
            emptyTableMessage='Não há produtos registrados.'
          />
        </div>
      </Paper>
      <Modal
        header='Selecione a quantidade a ser removida.'
        onConfirm={removeProduct}
        onCancel={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}>
        <ModalDelete
          product={itemToDelete}
          quantityToDelete={quantityToDelete}
          setQuantityToDelete={value => setQuantityToDelete(value)}
        />
      </Modal>
    </>
  )
}

export default memo(CashierSale)
