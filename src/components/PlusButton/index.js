import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const PlusButton = ({onClick}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      +
    </div>
  )
}

export default PlusButton

PlusButton.propTypes = {
  onClick: PropTypes.func,
}
