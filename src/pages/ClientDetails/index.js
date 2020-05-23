import React, {useEffect} from 'react'

import {Paper} from 'components'

import {useStore} from 'store'

import ClientForm from './form'

import styles from './index.module.scss'

const ClientDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Cliente</h1>
      </header>
      <Paper className={styles.paper}>
        <ClientForm />
      </Paper>
    </>
  )
}

export default ClientDetails
