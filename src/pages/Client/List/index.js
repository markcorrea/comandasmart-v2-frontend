import React, {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Input, Paper, PlusButton, ResponsiveTable} from 'components'

import useDebounce from 'utils/debounce'

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
    custom: client => client.email || '-',
  },
  {
    key: 'cpf',
    value: 'CPF',
    textAlign: 'left',
    custom: client => client.cpf || '-',
  },
]

const ClientList = () => {
  const {showMenu, loading, confirmationDialog} = useStore()
  const history = useHistory()

  const {searchClientsByName, deleteClientById} = useServices()

  const [clients, setClients] = useState({
    results: [],
    count: 0,
    rowsPerPage: 0,
  })

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState({value: '', currentSearch: ''})

  const debouncedSearchTerm = useDebounce(search.value, 1000)

  const onInputChange = useCallback(value => setSearch(prevSearch => ({...prevSearch, value})), [setSearch])

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
    [setClients, searchClientsByName, search.currentSearch]
  )

  const deleteClient = useCallback(
    async id => {
      const result = await deleteClientById(id)
      if (result) {
        searchClients(search.currentSearch, 1)
        setPage(1)
      }
    },
    [deleteClientById, searchClients, setPage, search.currentSearch]
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

  const callSearch = useCallback(
    searchTerm => {
      setSearch(prevSearch => ({...prevSearch, currentSearch: searchTerm}))
      searchClients(searchTerm, 1)
      setPage(1)
    },
    [setSearch, setPage, searchClients]
  )

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    callSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, callSearch])

  return (
    <>
      <header className={styles.header}>
        <h1>Clientes</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.search}>
          <Input
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
