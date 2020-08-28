import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Button from 'components/Button'
import Input from 'components/Input'

import Quantity from './Quantity'

import useDebounce from './debounce'

import styles from './index.module.scss'

const ProductSearch = ({onConfirm, onEnterPress, getProducts}) => {
  const [product, setProduct] = useState(null)
  const [productList, setProductList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const wrapperRef = useRef(null)

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
        const result = await getProducts(debouncedSearchTerm)
        setProductList(result)
        setLoadingList(false)
      }

      fetch()
    }
  }, [debouncedSearchTerm, getProducts, setShowOptions, setLoadingList, setProductList])

  const selectProduct = product => {
    setProduct(product)
    setShowOptions(false)
  }

  const handleInputChange = event => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const handleKeyPress = event => {
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
          label='Search'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleOnFocus}
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
                      key={`product.name_${index}`}>{`${product.uniqueCode} - ${product.name}`}</li>
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
        <Quantity quantity={quantity} setQuantity={setQuantity} disabled={!product} />
      </div>
      <div>
        <Button classes={buttonClass} onClick={onConfirm} disabled={!product || quantity < 1}>
          Adicionar
        </Button>
      </div>
    </div>
  )
}

ProductSearch.propTypes = {
  onConfirm: PropTypes.func,
  onEnterPress: PropTypes.func,
  getProducts: PropTypes.func,
}

ProductSearch.defaultProps = {
  onConfirm: () => {},
  onEnterPress: () => {},
  getProducts: () => {},
}

export default ProductSearch
