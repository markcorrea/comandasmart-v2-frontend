import React, {useEffect} from 'react'

import {Paper} from 'components'

import {useStore} from 'store'

import TerminalForm from './form'

import styles from './index.module.scss'

const TerminalDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Terminal</h1>
      </header>
      <Paper className={styles.paper}>
        <TerminalForm />
      </Paper>
    </>
  )
}

export default TerminalDetails
