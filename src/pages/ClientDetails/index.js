import React, {useEffect} from 'react'

import {Paper, Input, Button} from 'components'

import {useStore} from 'store'

import styles from './index.module.scss'

const ClientDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  const headerButtonClass = {
    root: {
      marginLeft: '20px',
    },
  }

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Cliente</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.grid}>
          <div className={styles.flexCell}>
            <Input label='Nome:' />
          </div>
          <div className={styles.flexCell}>
            <Input label='Código Único:' />
          </div>
          <div className={styles.flexCell}>
            <Input label='Telefone:' />
          </div>
          <div className={styles.flexCell}>
            <Input label='Data de Nascimento:' />
          </div>
          <div className={styles.flexCell}>
            <Input label='E-mail:' />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button color='cancel' classes={headerButtonClass}>
            Cancelar
          </Button>
          <Button classes={headerButtonClass}>Salvar</Button>
        </div>
      </Paper>
    </>
  )
}

export default ClientDetails
