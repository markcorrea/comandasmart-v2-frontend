import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Button from 'components/Button'
import Input from 'components/Input'

import {useStore} from 'store'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import useDebounce from 'utils/debounce'

import styles from './index.module.scss'

const ClientSearch = ({onNewClientClick, onConfirm, onCancel, onEnterPress, searchClientsByName}) => {
  const [client, setClient] = useState(null)
  const [clientList, setClientList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const wrapperRef = useRef(null)

  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)

  const {loading} = useStore()

  const buttonRight = {
    root: {
      minWidth: 'initial',
      maxWidth: '200px',
      margin: mediaQuerySmall ? '5px 0 5px 15px' : '0 auto 20px',
      float: mediaQuerySmall ? 'right' : 'none',
      display: mediaQuerySmall ? 'initial' : 'block',
    },
  }

  const buttonLeft = {
    root: {
      minWidth: 'initial',
      maxWidth: '200px',
      margin: mediaQuerySmall ? '5px 0 5px 15px' : '0 auto 20px',
      float: mediaQuerySmall ? 'left' : 'none',
      display: mediaQuerySmall ? 'initial' : 'block',
    },
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetch = async () => {
        setShowOptions(true)
        setLoadingList(true)
        const result = await searchClientsByName(debouncedSearchTerm)
        setClientList(result.data.results)
        setLoadingList(false)
      }

      fetch()
    }
  }, [debouncedSearchTerm, searchClientsByName, setShowOptions, setLoadingList, setClientList])

  const selectClient = client => {
    setClient(client)
    setShowOptions(false)
  }

  const handleInputChange = event => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const handleKeyPress = event => {
    if (loading) return null
    if (event.key === 'Enter' && !!searchTerm) {
      onEnterPress(searchTerm)
      setSearchTerm('')
      return setShowOptions(false)
    }
  }

  const handleOnFocus = () => {
    searchTerm && searchTerm !== '' && setShowOptions(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          label=' '
          placeholder='Search...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleOnFocus}
          disabled={loading}
        />
        <div className={clsx(styles.selectedClientName, client ? styles.selected : '')}>
          {client ? client.name : 'Nenhum cliente selecionado'}
        </div>
        {showOptions && (
          <div ref={wrapperRef} className={styles.listContainer}>
            <div className={styles.listOptions}>
              <ul>
                {loadingList ? (
                  <li className={styles.emptyList} key={`no_client`}>
                    loading...
                  </li>
                ) : clientList.length ? (
                  clientList.map((client, index) => (
                    <li onClick={() => selectClient(client)} key={`client.name_${index}`}>
                      {client.name}
                    </li>
                  ))
                ) : (
                  <li className={styles.emptyList} key={`no_client`}>
                    No clients found
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => onConfirm(client)} classes={buttonRight} disabled={!client}>
          Confirmar
        </Button>
        <Button color='cancel' classes={buttonRight} onClick={onCancel}>
          Cancelar
        </Button>
        {onNewClientClick && (
          <Button classes={buttonLeft} onClick={onNewClientClick}>
            Novo Cliente
          </Button>
        )}
      </div>
    </div>
  )
}

ClientSearch.propTypes = {
  onNewClientClick: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onEnterPress: PropTypes.func,
  searchClientsByName: PropTypes.func,
}

ClientSearch.defaultProps = {
  onConfirm: () => {},
  onEnterPress: () => {},
  searchClientsByName: () => {},
}

export default ClientSearch
