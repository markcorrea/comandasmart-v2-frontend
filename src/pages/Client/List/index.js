import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, ResponsiveTable} from 'components'

import {useStore} from 'store'

import services from 'services'

import styles from './index.module.scss'

export const columns = [
  {
    key: 'name',
    value: 'Nome',
    textAlign: 'left',
  },
  {
    key: 'email',
    value: 'E-mail',
    textAlign: 'left',
  },
  {
    key: 'cpf',
    value: 'CPF',
    textAlign: 'left',
  },
]

const ClientList = () => {
  const {showMenu, setLoading, loading} = useStore()
  const history = useHistory()

  const {getClients} = services

  const [clients, setClients] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      const result = await getClients()
      if (result) {
        setClients(result.data)
      }
      setLoading(false)
    }
    fetchClients()
  }, [getClients, setClients, setLoading])

  return (
    <>
      <header className={styles.header}>
        <h1>Clientes</h1>
      </header>
      <Paper className={styles.paper}>
        <ResponsiveTable
          columns={columns}
          rows={clients}
          titleColumn='name'
          onEditClick={row => history.push(`/client/${row.id}`)}
          onDeleteClick={row => console.log('delete', row)}
          rowClickable={row => history.push(`/client/${row.id}`)}
          emptyTableMessage='Não há clientes registrados.'
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default ClientList
