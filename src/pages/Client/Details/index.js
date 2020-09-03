import React, {useCallback, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'
import {useStore} from 'store'
import ClientForm from 'forms/ClientForm'

import clientResponse from 'mocks/client'

import styles from './index.module.scss'

const ClientDetails = () => {
  const store = useStore()
  const {clientId} = useParams()
  const history = useHistory()

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
        <h1>{clientId ? 'Editar' : 'Criar'} Cliente</h1>
      </header>
      <Paper className={styles.paper}>
        <ClientForm client={client} onSubmit={data => console.log('SUBMIT', data)} onCancel={() => history.push('/clients')}/>
      </Paper>
    </>
  )
}

export default ClientDetails
