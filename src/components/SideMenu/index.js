import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const SideMenu = ({items, className}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.title}>Menu</div>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={`menu_item_${index}`}>
              <div onClick={item.onClick}>
                <i className={item.icon} />
                <span>{item.label}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SideMenu.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
}

SideMenu.defaultProps = {
  className: '',
}

export default SideMenu
