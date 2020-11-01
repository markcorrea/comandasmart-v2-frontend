import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

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

const QuantityButtons = ({className, counter, setCounter, total}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.column}>
        <Button classes={buttonClass} onClick={() => setCounter(counter < 1 ? 0 : counter - 1)}>
          -
        </Button>
      </div>
      <div className={styles.counter}>
        {counter}
        {total ? `/${total}` : ''}
      </div>
      <div className={styles.column}>
        <Button
          classes={buttonClass}
          onClick={() => {
            if (total && counter >= total) return
            setCounter(counter + 1)
          }}>
          +
        </Button>
      </div>
    </div>
  )
}

QuantityButtons.propTypes = {
  className: PropTypes.string,
  counter: PropTypes.number,
  setCounter: PropTypes.func,
  total: PropTypes.number,
}

QuantityButtons.defaultProps = {
  counter: 0,
}

export default QuantityButtons
