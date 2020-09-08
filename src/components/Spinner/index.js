import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './index.module.scss'

const Spinner = ({className}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <i className='fas fa-circle-notch'></i>
    </div>
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner
