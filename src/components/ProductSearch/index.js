import React, {useState, useRef, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Input from 'components/Input'

import {Modal} from 'components'

import Quantity from './Quantity'

import {useStore} from 'store'

import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import useDebounce from './debounce'

import styles from './index.module.scss'

const ProductSearch = ({onConfirm, onEnterPress, searchProductsByName}) => {
  const [product, setProduct] = useState(null)
  const [productList, setProductList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [quantityModal, setQuantityModal] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [loadingList, setLoadingList] = useState(false)

  const mediaQuerySmall = useMediaQuery('min', mediaQueryMD)

  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  const {loading} = useStore()

  const buttonClass = {
    root: {
      marginTop: '25px',

      ...(mediaQuerySmall ? {float: 'right', marginLeft: '20px'} : {}),
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
    if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
      const fetch = async () => {
        setShowOptions(true)
        setLoadingList(true)
        const result = await searchProductsByName(debouncedSearchTerm)
        setProductList(result.data)
        setLoadingList(false)
        inputRef.current.focus()
      }
      fetch()
    }
  }, [debouncedSearchTerm, searchProductsByName, setShowOptions, setLoadingList, setProductList, inputRef])

  const selectProduct = useCallback(
    product => {
      setProduct(product)
      setSearchTerm('')
      setShowOptions(false)
      setQuantityModal(true)
    },
    [setProduct, setShowOptions]
  )

  const handleInputChange = useCallback(event => setSearchTerm(event.target.value), [setSearchTerm])

  const handleKeyPress = useCallback(
    event => {
      if (loading) return null
      if (event.key === 'Enter' && !!searchTerm) {
        onEnterPress(searchTerm, inputRef)
        setSearchTerm('')
        setShowOptions(false)
      }
    },
    [loading, searchTerm, onEnterPress, setSearchTerm, setShowOptions, inputRef]
  )

  const handleOnFocus = useCallback(() => {
    searchTerm && searchTerm !== '' && setShowOptions(true)
  }, [searchTerm, setShowOptions])

  const handleConfirm = useCallback(
    productData => {
      setQuantity(0)
      setSearchTerm('')
      setQuantityModal(false)
      return onConfirm(productData)
    },
    [setQuantity, setSearchTerm, onConfirm]
  )
  useEffect(() => {
    inputRef.current.focus()
  })

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          label='Busca'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleOnFocus}
          disabled={loading}
          ref={inputRef}
        />
        {showOptions && (
          <div ref={wrapperRef} className={styles.listContainer}>
            <div className={styles.listOptions}>
              <ul>
                {loadingList ? (
                  <li className={styles.emptyList} key={`no_product`}>
                    carregando...
                  </li>
                ) : productList.length ? (
                  productList.map((product, index) => (
                    <li
                      onClick={() => selectProduct(product)}
                      key={`product.name_${index}`}>{`${product.unique_code} - ${product.name}`}</li>
                  ))
                ) : (
                  <li className={styles.emptyList} key={`no_product`}>
                    Nenhum produto encontrado
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Modal header={`Selecione a quantidade: ${product ? product.name : '-'}`} open={quantityModal} hideButtons>
        <div className={styles.counterContainer}>
          <Quantity quantity={quantity} setQuantity={setQuantity} disabled={!product || loading} />
        </div>
        <div className={styles.modalButtonsContainer}>
          <Button classes={buttonClass} onClick={() => handleConfirm({product, quantity})} disabled={!product || quantity < 1}>
            Adicionar
          </Button>
          <Button classes={buttonClass} color='cancel' onClick={() => setQuantityModal(false)}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

ProductSearch.propTypes = {
  onConfirm: PropTypes.func,
  onEnterPress: PropTypes.func,
  searchProductsByName: PropTypes.func,
}

ProductSearch.defaultProps = {
  onConfirm: () => {},
  onEnterPress: () => {},
  searchProductsByName: () => {},
}

export default ProductSearch
