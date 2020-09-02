import React, {useEffect} from 'react'

import {Paper} from 'components'

import {useStore} from 'store'

import UserForm from './form'

import styles from './index.module.scss'

const UserDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Usuário</h1>
      </header>
      <Paper className={styles.paper}>
        <UserForm />
      </Paper>
    </>
  )
}

export default UserDetails
