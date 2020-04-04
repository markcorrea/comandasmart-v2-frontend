import React from 'react'
import TicketCard from 'components/TicketCard'

export default {
  title: 'Components/TicketCard',
  component: TicketCard,
}

export const Basic = () => (
  <div style={{padding: '10px'}}>
    <TicketCard />
  </div>
)
