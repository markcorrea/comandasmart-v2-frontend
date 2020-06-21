import React, {useEffect} from 'react'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

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
        <ResponsiveTable buttons={tableButtons} />
      </Paper>
    </>
  )
}

export default ClientList
