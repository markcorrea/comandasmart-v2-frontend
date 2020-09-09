import React, {useState, useEffect, useCallback} from 'react'
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
  const {showMenu} = useStore()
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
      const result = await completeOrderById(id, terminalId)
      if (result) setOrders(result.data)
    },
    [terminalId, completeOrderById]
  )

  const completeAllOrders = useCallback(async () => {
    const result = await completeAllOrdersByTerminalId(terminalId)
    if (result) setOrders(result.data)
  }, [terminalId, completeAllOrdersByTerminalId])

  const tableButtons = [
    {
      label: 'Completar todos',
      onClick: () => completeAllOrders(),
    },
  ]

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
        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </div>
    </>
  )
}

export default TerminalView
