import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import HeaderButton from './HeaderButton'
import LoggedUserInfo from './LoggedUserInfo'

import logo from 'assets/images/comandasmart_white.svg'
import userImage from 'assets/images/user.png'

import {useStore} from 'store'

import styles from './index.module.scss'

const Header = ({className}) => {
  const store = useStore()

  const UserIsLoggedComponents = () => {
    if (store.loggedUser) {
      const {
        firstName,
        lastName,
        company: {name: companyName},
      } = store.loggedUser
      return (
        <>
          <HeaderButton icon='sign-out-alt' label='sair' onClick={() => console.log('clicked info')} />
          <LoggedUserInfo userName={`${firstName} ${lastName}`} userImage={userImage} company={companyName} />
        </>
      )
    }
    return (
      <>
        <HeaderButton icon='cog' label='suporte' onClick={() => console.log('clicked info')} />
        <HeaderButton icon='envelope' label='contato' onClick={() => console.log('clicked info')} />
        <HeaderButton icon='info' label='sobre' onClick={() => console.log('clicked info')} />
      </>
    )
  }

  return (
    <div className={clsx(styles.container, className)}>
      <img alt='logo' src={logo} className={styles.logo} />
      <UserIsLoggedComponents />
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
}

Header.defaultProps = {
  className: '',
}

export default Header
