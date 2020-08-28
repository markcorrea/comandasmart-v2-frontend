import React, {useEffect} from 'react'

import {Paper, ProductCard} from 'components'

import {useStore} from 'store'

import styles from './index.module.scss'

const TicketDetails = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  const product = {
    number: 1,
    name: 'Alcool em Gel',
    price: 'R$92,80',
  }

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda 450</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <div className={styles.flexCell}>
          <ProductCard product={product} />
        </div>
        <button className={styles.addButton}>
          <i className='fas fa-plus-circle'></i>
        </button>
      </Paper>
    </>
  )
}

export default TicketDetails
