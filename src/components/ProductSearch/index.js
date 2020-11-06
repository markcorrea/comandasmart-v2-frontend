import React, {useState, useRef, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Button from 'components/Button'
import Input from 'components/Input'

import Quantity from './Quantity'

import {useStore} from 'store'

import removeAccentsAndLowerCase from 'utils/removeAccentsAndLowerCase'

import useDebounce from './debounce'

import styles from './index.module.scss'

const ProductSearch = ({onConfirm, onEnterPress, searchProductsByName}) => {
  const [product, setProduct] = useState(null)
  const [productList, setProductList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [loadingList, setLoadingList] = useState(false)

  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  const {loading} = useStore()

  const buttonClass = {
    root: {
      marginTop: '25px',
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
        const result = await searchProductsByName(removeAccentsAndLowerCase(debouncedSearchTerm))
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
      setShowOptions(false)
    },
    [setProduct, setShowOptions]
  )

  const handleInputChange = useCallback(event => setSearchTerm(event.target.value), [setSearchTerm])

  const handleKeyPress = useCallback(
    event => {
      if (loading) return null
      if (event.key === 'Enter' && !!searchTerm) {
        onEnterPress(removeAccentsAndLowerCase(searchTerm), inputRef)
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
      return onConfirm(productData)
    },
    [setQuantity, setSearchTerm, onConfirm]
  )

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <Input
          label='Search'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleOnFocus}
          disabled={loading}
          ref={inputRef}
        />
        <div className={clsx(styles.selectedProductName, product ? styles.selected : '')}>
          {product ? product.name : 'No product selected'}
        </div>
        {showOptions && (
          <div ref={wrapperRef} className={styles.listContainer}>
            <div className={styles.listOptions}>
              <ul>
                {loadingList ? (
                  <li className={styles.emptyList} key={`no_product`}>
                    loading...
                  </li>
                ) : productList.length ? (
                  productList.map((product, index) => (
                    <li
                      onClick={() => selectProduct(product)}
                      key={`product.name_${index}`}>{`${product.unique_code} - ${product.name}`}</li>
                  ))
                ) : (
                  <li className={styles.emptyList} key={`no_product`}>
                    No products found
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={styles.counterContainer}>
        <Quantity quantity={quantity} setQuantity={setQuantity} disabled={!product || loading} />
      </div>
      <div>
        <Button classes={buttonClass} onClick={() => handleConfirm({product, quantity})} disabled={!product || quantity < 1}>
          Adicionar
        </Button>
      </div>
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
