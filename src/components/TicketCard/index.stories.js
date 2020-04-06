import React from 'react'
import TicketCard from 'components/TicketCard'

export default {
  title: 'Components/TicketCard',
  component: TicketCard,
}

const ticket = {
  number: 1,
  userName: 'Daniela Maria',
  price: 'R$92,80',
  lastOrder: '00:40',
}

export const Basic = () => (
  <div style={{padding: '10px'}}>
    <TicketCard ticket={ticket} />
  </div>
)
