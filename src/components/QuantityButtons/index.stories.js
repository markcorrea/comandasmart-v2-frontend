import React from 'react'
import QuantityButtons from 'components/QuantityButtons'

export default {
  title: 'Components/QuantityButtons',
  component: QuantityButtons,
}

export const Basic = () => {
  return (
    <div style={{padding: '20px'}}>
      <QuantityButtons />
    </div>
  )
}
