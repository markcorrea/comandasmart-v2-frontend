import React from 'react'

import HeaderButton from './HeaderButton'
import LoggedUserInfo from './LoggedUserInfo'

import logo from 'assets/images/comandasmart_white.svg'
import userImage from 'assets/images/user.png'

import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.container}>
      <img alt='logo' src={logo} className={styles.logo} />
      {/* <HeaderButton icon='sign-out-alt' label='sair' onClick={() => console.log('clicked info')} /> */}
      <HeaderButton icon='cog' label='suporte' onClick={() => console.log('clicked info')} />
      <HeaderButton icon='envelope' label='contato' onClick={() => console.log('clicked info')} />
      <HeaderButton icon='info' label='sobre' onClick={() => console.log('clicked info')} />
      <LoggedUserInfo userName='Sávio Kanova' userImage={userImage} company='Kanova Revistaria'/>
    </div>
  )
}

export default Header
