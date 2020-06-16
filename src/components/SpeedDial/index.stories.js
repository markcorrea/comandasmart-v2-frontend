import React from 'react'
import SpeedDial from 'components/SpeedDial'

export default {
  title: 'Components/SpeedDial',
  component: SpeedDial,
}

export const Basic = () => {
  return (
    <div style={{padding: '20px'}}>
      <SpeedDial />
    </div>
  )
}
