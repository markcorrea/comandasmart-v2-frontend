import React, {useEffect} from 'react'

import {Paper} from 'components'

import {useStore} from 'store'

import CompanyForm from 'forms/CompanyForm'

import styles from './index.module.scss'

const CompanyDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Empresa</h1>
      </header>
      <Paper className={styles.paper}>
        <CompanyForm />
      </Paper>
    </>
  )
}

export default CompanyDetails
