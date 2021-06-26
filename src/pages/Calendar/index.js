import React, {useEffect} from 'react'
import {Paper} from 'components'

import {useStore} from 'store'

import styles from './index.module.scss'

const ClientList = () => {
  const {showMenu} = useStore()
  useEffect(() => {
    showMenu()
  }, [showMenu])

  return (
    <>
      <header className={styles.header}>
        <h1>Agenda</h1>
      </header>
      <Paper className={styles.paper}>
        Agenda aqui
      </Paper>
    </>
  )
}

export default ClientList
