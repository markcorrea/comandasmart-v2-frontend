import React from 'react'
import CardList from 'components/CardList'

import {rows, columns} from './mock'

export default {
  title: 'Components/CardList',
  component: CardList,
}

const buttons = [
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

const cardDisplayColumns = ['name', 'email']

export const Basic = () => {
  return (
    <div style={{padding: '20px'}}>
      <CardList
        titleColumn='dessert'
        hasCheckbox
        hasButtons={buttons}
        rows={rows.products}
        columns={columns}
        cardDisplayColumns={cardDisplayColumns}
        onViewClick={viewItem => console.log('view', viewItem)}
        onEditClick={editItem => console.log('edit', editItem)}
        onDeleteClick={deleteItem => console.log('delete', deleteItem)}
        rowClickable={row => console.log('ROW CLICKABLE', row)}
      />
    </div>
  )
}
