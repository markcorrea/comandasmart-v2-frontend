import React from 'react'
import Table from 'components/Table'

import {rows, columns} from './mock'
import styles from './index.module.scss'

export default {
  title: 'Components/Table',
  component: Table,
}

const tableDisplayColumns = ['name', 'cpf']

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
      <Table
        className={styles.table}
        rows={rows.products}
        columns={columns}
        onViewClick={viewItem => console.log('view', viewItem)}
        onEditClick={editItem => console.log('edit', editItem)}
        onDeleteClick={deleteItem => console.log('delete', deleteItem)}
        tableDisplayColumns={tableDisplayColumns}
        hasCheckboxWithButtons={tableButtons}
        rowClickable={row => console.log('ROW CLICKABLE', row)}
      />
    </div>
  )
}
