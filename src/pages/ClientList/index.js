import React, {useEffect} from 'react'

import {Paper, Table} from 'components'

import {useStore} from 'store'

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
        <Table />
      </Paper>
    </>
  )
}

export default ClientList
