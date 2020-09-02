import React, {useState, useEffect, memo} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'

import {Paper, ProductSearch, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

import styles from './index.module.scss'

const columns = [
  {
    key: 'uniqueCode',
    value: 'Código',
    textAlign: 'left',
  },
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'price',
    value: 'Preço',
  },
]

const tableButtons = [
  {
    label: 'Receber',
    onClick: selectedItems => console.log('PURCHASING', selectedItems),
  },
  {
    label: 'Remover',
    onClick: selectedItems => console.log('DELETING', selectedItems),
    classes: {
      backgroundColor: 'red',
    },
  },
]

const TotalPrice = ({ticket}) => <div className={styles.totalPrice}>{`Total: ${(ticket && ticket.price) || 0}`}</div>

TotalPrice.propTypes = {
  ticket: PropTypes.object,
}

const CashierTicket = () => {
  const {getProducts, getTicketById} = services
  const {ticketId} = useParams()
  const store = useStore()

  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await getTicketById()
      if (result) {
        setTicket(result)
      }
    }

    fetchTicket(ticketId)
  }, [ticketId, getTicketById])

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda - {(ticket && ticket.number.toString()) || '--'}</h1>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          getProducts={getProducts}
          onEnterPress={message => console.log('enter here', message)}
          onConfirm={() => console.log('confirming')}
        />
        <div className={styles.responsiveTable}>
          <ResponsiveTable
            columns={columns}
            rows={(ticket && ticket.items) || []}
            titleColumn='name'
            hasCheckbox
            hasButtons={tableButtons}
            additionalRow={<TotalPrice ticket={ticket} />}
            emptyTableMessage='Não há produtos registrados.'
          />
        </div>
      </Paper>
    </>
  )
}

export default memo(CashierTicket)
