import React, {useEffect, useState, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'
import {useStore} from 'store'
import ClientForm from 'forms/ClientForm'

import useServices from 'services'

import styles from './index.module.scss'

const ClientDetails = () => {
  const {showMenu, loading} = useStore()
  const {clientId} = useParams()
  const history = useHistory()
  const {getClientById, saveClient} = useServices()

  const [client, setClient] = useState({})

  useEffect(() => {
    const fetchClient = async () => {
      const result = await getClientById(clientId)
      if (result) setClient(result.data)
    }

    if (clientId) fetchClient()
  }, [clientId, getClientById, setClient])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const clearPhoneMask = phone =>
    phone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')
      .trim()

  const postClient = useCallback(
    async body => {
      const payload = {
        ...body,
        ...(body.birth_date ? {birth_date: new Date(body.birth_date)} : {}),
        ...(body.phone ? {phone: clearPhoneMask(body.phone)} : {}),
        ...(clientId ? {id: clientId} : {}),
      }

      const result = await saveClient(payload)
      if (result) history.push(`/clients`)
    },
    [clientId, saveClient, history]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>{clientId ? 'Editar' : 'Criar'} Cliente</h1>
      </header>
      <Paper className={styles.paper}>
        <ClientForm
          client={client}
          onSubmit={data => postClient(data)}
          onCancel={() => history.push('/clients')}
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default ClientDetails
