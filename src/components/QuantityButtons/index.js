import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'

import styles from './index.module.scss'

const buttonClass = {
  root: {
    width: 'min-content',
    minWidth: 'min-content',
    borderRadius: '5px',
    padding: '9px',
    lineHeight: '0.3rem',
  },
}

const QuantityButtons = ({counter, setCounter}) => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Button
          classes={buttonClass}
          loading={false}
          onClick={() => setCounter(prevCounter => (prevCounter < 1 ? 0 : prevCounter - 1))}>
          -
        </Button>
      </div>
      <div className={styles.counter}>{counter}</div>
      <div className={styles.column}>
        <Button classes={buttonClass} loading={false} onClick={() => setCounter(counter + 1)}>
          +
        </Button>
      </div>
    </div>
  )
}

QuantityButtons.propTypes = {
  counter: PropTypes.number,
  setCounter: PropTypes.func,
}

QuantityButtons.defaultProps = {
  counter: 0,
}

export default QuantityButtons
