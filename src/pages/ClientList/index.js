import React, {useEffect} from 'react'

import {Paper, Table} from 'components'

import {useStore} from 'store'

import {rows, columns} from './mock'

import styles from './index.module.scss'

const ClientList = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

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

  return (
    <>
      <header className={styles.header}>
        <h1>Clientes</h1>
      </header>
      <Paper className={styles.paper}>
        <Table
          className={styles.table}
          rows={rows.products}
          columns={columns}
          onViewClick={viewItem => console.log('view', viewItem)}
          onEditClick={editItem => console.log('edit', editItem)}
          onDeleteClick={deleteItem => console.log('delete', deleteItem)}
          hasCheckboxWithButtons={tableButtons}
          rowClickable={row => console.log('ROW CLICKABLE', row)}
        />
      </Paper>
    </>
  )
}

export default ClientList
