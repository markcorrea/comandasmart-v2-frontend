import React from 'react'
import SpeedDial from 'components/SpeedDial'

export default {
  title: 'Components/SpeedDial',
  component: SpeedDial,
}

const tableButtons = [
  {
    label: 'Purchase',
    onClick: selectedItems => console.log('PURCHASING', selectedItems),
    classes: {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  {
    label: 'Delete',
    onClick: selectedItems => console.log('DELETING', selectedItems),
    classes: {
      backgroundColor: 'red',
    },
  },
  {
    label: 'Other',
    onClick: selectedItems => console.log('OTHER', selectedItems),
  },
]

export const Basic = () => {
  return (
    <div style={{padding: '20px'}}>
      <SpeedDial buttons={tableButtons} />
    </div>
  )
}
