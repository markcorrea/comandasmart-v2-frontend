import React, {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Input, Paper, PlusButton, ResponsiveTable} from 'components'

import {useStore} from 'store'

import useServices from 'services'

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
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const {searchClientsByName, getClients, deleteClientById} = useServices()

  const [clients, setClients] = useState({
    results: [],
    count: 0,
    rowsPerPage: 0,
  })

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState({value: '', currentSearch: ''})

  const searchClients = useCallback(
    async (searchTerm, page) => {
      const result = await searchClientsByName(searchTerm, page)
      if (result) setClients(prevClients => ({...prevClients, ...result.data}))
    },
    [searchClientsByName, setClients]
  )

  const loadMoreClients = useCallback(
    async page => {
      const result = await searchClientsByName(search.currentSearch, page)
      if (result) {
        setClients(prevClients => {
          return {
            ...prevClients,
            ...result.data,
            results: [...prevClients.results, ...result.data.results],
          }
        })
      }
    },
    [getClients, setClients, search.currentSearch]
  )

  const deleteClient = useCallback(
    async id => {
      const result = await deleteClientById(id)
      if (result) {
        setClients(result)
        const newClients = await getClients()
        if (newClients) setClients(newClients.data)
      }
    },
    [deleteClientById, setClients, getClients]
  )

  const onChangePage = useCallback(
    page => {
      setPage(page)
      searchClients(search.currentSearch, page)
    },
    [setPage, searchClients, search.currentSearch]
  )

  const onLoadMore = useCallback(
    page => {
      setPage(page)
      loadMoreClients(page)
    },
    [setPage, loadMoreClients]
  )

  const onInputChange = useCallback(value => setSearch(prevSearch => ({...prevSearch, value})), [setSearch])

  const callSearch = useCallback(() => {
    setSearch(prevSearch => ({...prevSearch, currentSearch: prevSearch.value}))
    searchClients(search.value, 1)
  }, [setSearch, searchClients, search])

  const handleKeyPress = useCallback(
    event => {
      if (event.key === 'Enter') return callSearch()
    },
    [callSearch]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    searchClients()
  }, [searchClients])

  return (
    <>
      <header className={styles.header}>
        <h1>Clientes</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.search}>
          <Input
            onKeyPress={handleKeyPress}
            value={search.value}
            onChange={event => onInputChange(event.target.value)}
            placeholder='Buscar por cliente...'
            disabled={loading}
            label=''
            endIcon={
              <div className={styles.searchButton} onClick={!loading ? callSearch : () => {}}>
                <i className='fa fa-search' />
              </div>
            }
          />
          <div className={styles.searchText}>
            Busca atual: <span className={styles.searchTerm}>{search.currentSearch || 'Todos os clientes'}</span>
          </div>
        </div>
        <ResponsiveTable
          columns={columns}
          rows={clients.results || []}
          titleColumn='name'
          onEditClick={row => history.push(`/client/${row.id}`)}
          onDeleteClick={row =>
            confirmationDialog({
              header: 'Excluir cliente',
              body: `Deseja realmente excluir "${row.name}"?`,
              onConfirm: () => deleteClient(row.id),
            })
          }
          rowClickable={row => history.push(`/client/${row.id}`)}
          emptyTableMessage='Não há clientes registrados.'
          loading={loading}
          pagination={{count: clients.count, page, onChangePage}}
          loadMore={{count: clients.count, page, onLoadMore}}
        />
      </Paper>
      <div className={styles.plusButtonContainer}>
        <PlusButton onClick={() => history.push(`/client/`)} />
      </div>
    </>
  )
}

export default ClientList
