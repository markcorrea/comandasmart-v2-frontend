import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Button from 'components/Button'
import Input from 'components/Input'

import {useStore} from 'store'

import removeAccentsAndLowerCase from 'utils/removeAccentsAndLowerCase'

import useDebounce from './debounce'

import styles from './index.module.scss'

const ClientSearch = ({onConfirm, onCancel, onEnterPress, searchClientsByName}) => {
  const [client, setClient] = useState(null)
  const [clientList, setClientList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const wrapperRef = useRef(null)

  const {loading} = useStore()

  const rightButton = {
    root: {
      minWidth: 'initial',
      maxWidth: '200px',
      margin: '5px 0 5px 15px',
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
        const result = await searchClientsByName(removeAccentsAndLowerCase(debouncedSearchTerm))
        setClientList(result.data)
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
      onEnterPress(removeAccentsAndLowerCase(searchTerm))
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
        <Button color='cancel' classes={rightButton} onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={() => onConfirm(client)} classes={rightButton} disabled={!client}>
          Alterar
        </Button>
      </div>
    </div>
  )
}

ClientSearch.propTypes = {
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
