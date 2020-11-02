import React, {useState, useEffect, useCallback} from 'react'
import SwipeableViews from 'react-swipeable-views'

import {Button, OrderCard, SpeedDial} from 'components'

import {useParams} from 'react-router-dom'
import {useStore} from 'store'
import useServices from 'services'
import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'

import io from 'socket.io-client'

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

const socketUrl = 'https://comandasmart-websocket.herokuapp.com'
// const socketUrl = 'https://9ryy885xhl.execute-api.sa-east-1.amazonaws.com/dev'
// const socketUrl = 'https://websocket.comandasmart.com.br'

const TerminalView = () => {
  const {showMenu, confirmationDialog} = useStore()
  const {terminalId} = useParams()
  const {getOrdersByTerminalId, completeOrderById, completeAllOrdersByTerminalId} = useServices()
  const mediaMD = useMediaQuery('min', mediaQueryMD)

  const [orders, setOrders] = useState([])

  const fetchOrders = useCallback(async () => {
    const result = await getOrdersByTerminalId(terminalId)
    if (result) setOrders(result.data)
  }, [getOrdersByTerminalId, setOrders, terminalId])

  const completeAllOrders = useCallback(async () => {
    const result = await completeAllOrdersByTerminalId(terminalId)
    if (result) setOrders([])
  }, [terminalId, completeAllOrdersByTerminalId])

  useEffect(() => {
    const socket = io(`${socketUrl}`)
    socket.on(terminalId, () => {
      fetchOrders()
    })

    return function cleanup() {
      socket.close()
    }
  }, [terminalId, fetchOrders])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    if (terminalId) fetchOrders(terminalId)
  }, [terminalId, fetchOrders])

  const completeOrder = useCallback(
    async id => {
      const result = await completeOrderById(id)
      if (result) setOrders(result.data)
    },
    [setOrders, completeOrderById]
  )

  const buttons = [
    {
      label: 'Completar Todos',
      onClick: () =>
        confirmationDialog({
          header: 'Completar todos os pedidos?',
          body: 'Todos os pedidos serão considerados entregues.',
          onConfirm: () => completeAllOrders(),
        }),
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <h1>Pedidos pendentes</h1>
        {mediaMD && (
          <>
            <Button
              className={styles.headerButton}
              onClick={() =>
                confirmationDialog({
                  header: 'Completar todos os pedidos?',
                  body: 'Todos os pedidos serão considerados entregues.',
                  onConfirm: () => completeAllOrders(),
                })
              }>
              Completar Todos
            </Button>
          </>
        )}
      </header>
      <div className={styles.container}>
        {orders.length ? (
          <Views key={orders} orders={orders} completeOrder={completeOrder} />
        ) : (
          <div className={styles.noOrders}>Não há pedidos pendentes</div>
        )}
      </div>
      {!mediaMD && (
        <div className={styles.speedDialContainer}>
          <SpeedDial buttons={buttons} />
        </div>
      )}
    </>
  )
}

export default TerminalView
