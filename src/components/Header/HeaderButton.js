import React from 'react'
import PropTypes from 'prop-types'

import {useStore} from 'store'

import styles from './index.module.scss'

const HeaderButton = ({label, icon, onClick}) => {
  const {loading} = useStore()

  return (
    <div className={styles.button} onClick={!loading ? onClick : null}>
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
