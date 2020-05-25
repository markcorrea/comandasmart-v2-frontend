import React, {useEffect} from 'react'

import {Paper} from 'components'

import {useStore} from 'store'

import ProductForm from './form'

import styles from './index.module.scss'

const ProductDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Produto</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductForm />
      </Paper>
    </>
  )
}

export default ProductDetails
