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
          withCheckbox
        />
      </Paper>
    </>
  )
}

export default ClientList
