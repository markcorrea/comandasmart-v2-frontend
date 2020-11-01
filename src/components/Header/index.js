import React, {useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import logo from 'assets/images/comandasmart_white.svg'
import userImage from 'assets/images/user.png'

import HeaderButton from './HeaderButton'
import LoggedUserInfo from './LoggedUserInfo'

import {useStore} from 'store'
import useServices from 'services'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryMD, mediaQueryLG} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

const Header = ({className, toggleMenu}) => {
  const store = useStore()
  const history = useHistory()

  const {logout} = useServices()

  const logoutUser = useCallback(() => {
    logout()
    history.push('/login')
  }, [logout])

  const mediaMD = useMediaQuery('min', mediaQueryMD)
  const mediaLG = useMediaQuery('min', mediaQueryLG)

  const UserIsLoggedComponents = () => {
    if (store.loggedUser) {
      const {
        firstName,
        company: {name: companyName},
      } = store.loggedUser
      return (
        <>
          <HeaderButton icon='sign-out-alt' label='sair' onClick={logoutUser} />
          {mediaMD && <LoggedUserInfo userName={firstName} userImage={userImage} company={companyName} />}
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

  const Logo = () => <img alt='logo' src={logo} className={styles.logo} />

  return (
    <div className={clsx(styles.container, className)}>
      {mediaLG ? (
        <Logo />
      ) : store.sideMenu ? (
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <i className='fas fa-bars'></i>
        </div>
      ) : (
        <Logo />
      )}
      <UserIsLoggedComponents />
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
