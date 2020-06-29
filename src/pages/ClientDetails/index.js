import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {Paper} from 'components'
import {useStore} from 'store'
import ClientForm from 'forms/ClientForm'

import clientResponse from 'mocks/client'

import styles from './index.module.scss'
import {subMinutes} from 'date-fns'

const ClientDetails = () => {
  const store = useStore()
  const {clientId} = useParams()

  const [client, setClient] = useState({})

  const fetchClient = useCallback(id => {
    const result = clientResponse.data.find(item => item.id === id)
    return result
  }, [])

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    if (clientId && clientId !== client.id) {
      const newClient = fetchClient(clientId)
      setClient(newClient)
    }
  }, [client, fetchClient, setClient, clientId])

  return (
    <>
      <header className={styles.header}>
        <h1>Editar Cliente</h1>
      </header>
      <Paper className={styles.paper}>
        <ClientForm client={client} onSubmit={data => console.log('SUBMIT', data)} />
      </Paper>
    </>
  )
}

export default ClientDetails
