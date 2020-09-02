import React, {useEffect} from 'react'
import SwipeableViews from 'react-swipeable-views'

import {TicketCard} from 'components'

import {useStore} from 'store'

import tickets from 'mocks/ticket'

import styles from './index.module.scss'

const TerminalView = () => {
  const store = useStore()

  useEffect(() => {
    store.showMenu()
  }, [store])

  return (
    <>
      <header className={styles.header}>
        <h1>Pedidos pendentes</h1>
      </header>
      <div className={styles.container}>
        {tickets.data.map((ticket, index) => (
          <SwipeableViews
            key={`ticket_${index}`}
            index={1}
            onChangeIndex={() => console.log('CONSOLING', index)}
            enableMouseEvents>
            <div styles={styles.flexCell} />
            <div className={styles.flexCell}>
              <TicketCard inset={false} ticket={ticket} />
            </div>
          </SwipeableViews>
        ))}
      </div>
    </>
  )
}

export default TerminalView
