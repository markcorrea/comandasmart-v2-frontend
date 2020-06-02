import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import logo from 'assets/images/comandasmart_white.svg'
import logoMobile from 'assets/images/logo_white.svg'
import userImage from 'assets/images/user.png'

import useMediaQuery from 'utils/mediaQuery'

import HeaderButton from './HeaderButton'
import LoggedUserInfo from './LoggedUserInfo'

import {useStore} from 'store'

import {mediaQueryLG} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const Header = ({className}) => {
  const store = useStore()

  const mediaLG = useMediaQuery('min', mediaQueryLG)

  const UserIsLoggedComponents = () => {
    if (store.loggedUser) {
      const {
        firstName,
        company: {name: companyName},
      } = store.loggedUser
      return (
        <>
          <HeaderButton icon='sign-out-alt' label='sair' onClick={() => console.log('clicked info')} />
          <LoggedUserInfo userName={firstName} userImage={userImage} company={companyName} />
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
      <img alt='logo' src={mediaLG ? logo : logoMobile} className={styles.logo} />
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
