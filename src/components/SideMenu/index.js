import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import userImage from 'assets/images/user.png'

import {useStore} from 'store'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryLG} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

const SideMenu = ({items, className}) => {
  const mediaLG = useMediaQuery('min', mediaQueryLG)
  const {loading} = useStore()

  return (
    <div className={clsx(styles.container, className)}>
      {!mediaLG ? (
        <div className={styles.userInfo}>
          <div alt='user' className={styles.userImage} style={{backgroundImage: `url(${userImage})`}}>
            {!userImage && <i className='fa fa-user' />}
          </div>
          <span>Savio Canova</span> - Admin
          <br />
          Kanova Revistaria
        </div>
      ) : (
        <div className={styles.title}>Menu</div>
      )}
      <ul>
        {items.map((item, index) => {
          return (
            <li key={`menu_item_${index}`}>
              <div onClick={!loading ? item.onClick : null}>
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
