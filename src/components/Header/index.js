import React, {useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import logo from 'assets/images/comandasmart_white.svg'

import HeaderButton from './HeaderButton'
import LoggedUserInfo from './LoggedUserInfo'

import {useStore} from 'store'
import useServices from 'services'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryMD, mediaQueryLG} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

const UserIsLoggedComponents = ({loggedUser, unsetLoggedUser}) => {
  const mediaMD = useMediaQuery('min', mediaQueryMD)

  const history = useHistory()

  const {logout} = useServices()

  const logoutUser = useCallback(() => {
    logout()
    unsetLoggedUser()
    history.push('/login')
  }, [history, logout, unsetLoggedUser])

  if (loggedUser) {
    const {name, company, image} = loggedUser
    return (
      <>
        <HeaderButton icon='sign-out-alt' label='sair' onClick={logoutUser} />
        {mediaMD && <LoggedUserInfo userName={name} userImage={image} company={company} />}
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

UserIsLoggedComponents.propTypes = {
  loggedUser: PropTypes.object,
  unsetLoggedUser: PropTypes.func,
}

const Header = ({className, toggleMenu}) => {
  const store = useStore()

  const {loggedUser, sideMenu, unsetLoggedUser} = store

  const mediaLG = useMediaQuery('min', mediaQueryLG)

  const Logo = () => <img alt='logo' src={logo} className={styles.logo} />

  return (
    <div className={clsx(styles.container, className)}>
      {mediaLG ? (
        <Logo />
      ) : sideMenu ? (
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <i className='fas fa-bars'></i>
        </div>
      ) : (
        <Logo />
      )}
      <UserIsLoggedComponents loggedUser={loggedUser} unsetLoggedUser={unsetLoggedUser} />
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  toggleMenu: PropTypes.func,
}

Header.defaultProps = {
  className: '',
}

export default Header
