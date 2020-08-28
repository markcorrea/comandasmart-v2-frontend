import React from 'react'
import ProductCard from 'components/ProductCard'

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
}

const ticket = {
  number: 1,
  userName: 'Daniela Maria',
  price: 'R$92,80',
  lastOrder: '00:40',
}

export const Basic = () => (
  <div style={{padding: '10px'}}>
    <ProductCard ticket={ticket} />
  </div>
)
