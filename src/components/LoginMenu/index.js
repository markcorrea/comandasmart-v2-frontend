import React from 'react'
import PropTypes from 'prop-types'

import logo from 'assets/images/logo_login_menu.svg'

import styles from './index.module.scss'

const LoginMenu = ({items}) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img alt='logo' src={logo} />
      </div>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={`login_menu_item_${index}`}>
              <div onClick={item.onClick}>
                <i className={item.icon} />
                <span>{item.label}</span>
              </div>
            </li>
          )
        })}
      </ul>
      <div className={styles.copyright}>
        ©2020 COMANDA<span>SMART</span>
      </div>
    </div>
  )
}

LoginMenu.propTypes = {
  items: PropTypes.array.isRequired,
}

export default LoginMenu
