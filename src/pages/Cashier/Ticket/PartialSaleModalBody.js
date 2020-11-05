import React, {useState, useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'

import {QuantityButtons, ResponsiveTable} from 'components'

import formatMoney from 'utils/formatMoney'

import styles from './index.module.scss'

const TotalPrice = ({orders}) => {
  const sum = orders.reduce((acc, {product, quantity_selected}) => {
    const quantity = quantity_selected || 0
    return acc + parseFloat(product.price * quantity)
  }, 0)

  return <div className={styles.totalPrice}>{`Total Geral: ${formatMoney(sum)}`}</div>
}

TotalPrice.propTypes = {
  orders: PropTypes.array,
}

const PartialSaleModalBody = ({orders, onConfirm, onCancel}) => {
  const [orderList, setOrderList] = useState(orders)

  const updateQuantity = useCallback(
    (order, value) => {
      setOrderList(prevList => {
        const index = prevList.findIndex(item => item.id === order.id)
        const newList = [...prevList]
        newList[index].quantity_selected = value
        return newList
      })
    },
    [setOrderList]
  )

  const columns = useMemo(
    () => [
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
        key: 'price',
        value: 'Preço Unitário',
        custom: order => formatMoney(parseFloat(order.price)),
      },
      {
        key: 'quantity',
        custom: order => (
          <QuantityButtons
            className={styles.quantityButtonsPosition}
            counter={order.quantity_selected}
            setCounter={value => updateQuantity(order, value)}
            total={order.quantity}
          />
        ),
        value: 'Quantidade',
      },
      {
        key: 'total',
        value: 'Valor a pagar',
        custom: order => {
          const quantity = order.quantity_selected || 0
          return formatMoney(parseFloat(quantity * order.price))
        },
      },
    ],
    [updateQuantity]
  )

  const hasItemsToSell = useMemo(() => orderList.some(item => item.quantity_selected > 0), [orderList])

  const tableButtons = useMemo(
    () => [
      {
        label: 'Concluir',
        onClick: () => {
          if (hasItemsToSell) {
            onConfirm(orderList)
            onCancel()
          }
        },
      },
      {
        label: 'Cancelar',
        onClick: onCancel,
      },
    ],
    [hasItemsToSell, onConfirm, onCancel, orderList]
  )

  const formattedOrders = useMemo(() => {
    if (!orderList) return []
    return orderList.map(order => ({
      ...order,
      unique_code: order.product.unique_code,
      name: order.product.name,
      price: order.product.price,
      total: formatMoney(parseFloat(order.price)),
    }))
  }, [orderList])

  return (
    <div className={styles.responsiveTable}>
      <ResponsiveTable
        columns={columns}
        rows={formattedOrders}
        titleColumn='name'
        hasButtons={tableButtons}
        additionalRow={<TotalPrice orders={orderList} />}
        emptyTableMessage='Não há produtos registrados.'
        disabled={false}
      />
    </div>
  )
}

export default PartialSaleModalBody

PartialSaleModalBody.propTypes = {
  orders: PropTypes.array,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}

PartialSaleModalBody.displayName = 'PartialSaleModalBody'
