import React from 'react'
import {useHistory} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import userImage from 'assets/images/user.png'

import {useStore} from 'store'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryLG} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

const SideMenu = ({menus, className}) => {
  const mediaLG = useMediaQuery('min', mediaQueryLG)
  const {loggedUser, loading} = useStore()
  const history = useHistory()

  return (
    <div className={clsx(styles.container, className)}>
      {loggedUser && !mediaLG ? (
        <div className={styles.userInfo}>
          <div alt='user' className={styles.userImage} style={{backgroundImage: `url(${loggedUser.image})`}}>
            {!userImage && <i className='fa fa-user' />}
          </div>
          <span>{loggedUser.name}</span>
          <br />
          {loggedUser.company}
        </div>
      ) : (
        <div className={styles.title}>Menu</div>
      )}
      <ul>
        {menus?.map((item, index) => {
          return (
            <li key={`menu_item_${index}`}>
              <div onClick={!loading ? () => history.push(item.href) : null}>
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
  menus: PropTypes.array.isRequired,
  className: PropTypes.string,
}

SideMenu.defaultProps = {
  className: '',
  menus: [],
}

export default SideMenu
