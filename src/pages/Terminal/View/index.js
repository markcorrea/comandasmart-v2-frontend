import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import SwipeableViews from 'react-swipeable-views'

import {OrderCard, SpeedDial} from 'components'

import {useParams} from 'react-router-dom'
import {useStore} from 'store'
import useServices from 'services'

import styles from './index.module.scss'

const Views = ({orders, completeOrder}) => {
  return orders.map((order, index) => (
    <SwipeableViews key={`order_${index}`} index={1} onChangeIndex={() => completeOrder(order.id)} enableMouseEvents>
      <div styles={styles.flexCell} />
      <div className={styles.flexCell}>
        <OrderCard inset={false} order={order} />
      </div>
    </SwipeableViews>
  ))
}

const TerminalView = () => {
  const {showMenu, confirmationDialog} = useStore()
  const {terminalId} = useParams()
  const {getOrdersByTerminalId, completeOrderById, completeAllOrdersByTerminalId} = useServices()

  const [orders, setOrders] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrdersByTerminalId(terminalId)
      if (result) setOrders(result.data)
    }

    if (terminalId) fetchOrders(terminalId)
  }, [terminalId, getOrdersByTerminalId])

  const completeOrder = useCallback(
    async id => {
      const result = await completeOrderById(id)
      if (result) setOrders(result.data)
    },
    [setOrders, completeOrderById]
  )

  const completeAllOrders = useCallback(async () => {
    const result = await completeAllOrdersByTerminalId(terminalId)
    if (result) setOrders([])
  }, [terminalId, completeAllOrdersByTerminalId])

  const speedDialButtons = useMemo(
    () => [
      {
        label: 'Completar todos',
        onClick: () =>
          confirmationDialog({
            header: 'Completar todos os pedidos?',
            body: 'Todos os pedidos serão considerados entregues.',
            onConfirm: () => completeAllOrders(),
          }),
      },
    ],
    [confirmationDialog, completeAllOrders]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Pedidos pendentes</h1>
      </header>
      <div className={styles.container}>
        {orders.length ? (
          <Views key={orders} orders={orders} completeOrder={completeOrder} />
        ) : (
          <div className={styles.noOrders}>Não há pedidos pendentes</div>
        )}
      </div>
      <div className={styles.speedDialContainer}>
        <SpeedDial buttons={speedDialButtons} />
      </div>
    </>
  )
}

export default memo(TerminalView)
