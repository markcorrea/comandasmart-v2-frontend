import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {Paper, ProductCard, ProductSearch, SpeedDial} from 'components'

import {useStore} from 'store'

import services from 'services'

import styles from './index.module.scss'

const tableButtons = [
  {
    label: 'Mudar mesa',
    onClick: () => console.log('adicionando'),
  },
]

const TicketDetails = () => {
  const {searchProducts, getTicketById} = services
  const {showMenu, setLoading} = useStore()
  const {ticketId} = useParams()

  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true)
      const result = await getTicketById(ticketId)
      if (result) {
        setTicket(result)
      }
      setLoading(false)
    }

    fetchTicket(ticketId)
  }, [ticketId, getTicketById, setLoading])

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda 450</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProducts={searchProducts}
          onEnterPress={message => console.log('enter here', message)}
          onConfirm={() => console.log('confirming')}
        />
        {ticket && ticket.items.length ? (
          ticket.items.map((product, index) => (
            <div key={`item_${index}`} className={styles.flexCell}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className={styles.emptyTicket}>Não há itens na comanda atual.</div>
        )}

        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </Paper>
    </>
  )
}

export default TicketDetails
