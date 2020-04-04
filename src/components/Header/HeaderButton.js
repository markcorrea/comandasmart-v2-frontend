import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const HeaderButton = ({label, icon, onClick}) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {icon && (
        <span>
          <i className={`fa fa-${icon}`} />
          &nbsp;&nbsp;
        </span>
      )}
      <span>{label}</span>
    </div>
  )
}

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

HeaderButton.defaultProps = {
  icon: null,
}

export default HeaderButton
