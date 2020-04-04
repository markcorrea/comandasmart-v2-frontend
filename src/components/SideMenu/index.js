import React from 'react'

import styles from './index.module.scss'

const SideMenu = ({items}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Menu</div>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={`menu_item_${index}`}>
              <a onClick={item.onClick}>
                <i className={`fa ${item.icon}`} />
                <span>{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SideMenu
