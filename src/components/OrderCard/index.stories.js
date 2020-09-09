import React from 'react'
import OrderCard from 'components/OrderCard'

export default {
  title: 'Components/OrderCard',
  component: OrderCard,
}

const order = {
  id: '5',
  ticket: 1,
  name: 'Pão de Mel Odara',
  ready: false,
  terminalId: 2,
}

export const Basic = () => (
  <div style={{padding: '10px'}}>
    <OrderCard order={order} />
  </div>
)
