import React from 'react'
import clsx from 'clsx'

import logo from 'assets/images/logo_footer.svg'

import styles from './index.module.scss'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexItem}>
        <a href='http://www.google.com.br'>Sobre nós</a>
        <a href='http://www.google.com.br'>Contato</a>
        <a href='http://www.google.com.br'>Suporte</a>
        <a href='http://www.google.com.br'>Seja um revendedor</a>
        <a href='http://www.google.com.br'>Termos de uso e Privacidade</a>
      </div>
      <div className={clsx(styles.flexItem, styles.right)}>
        <img alt='logo' src={logo} className={styles.logo} />
        <span>contato@comandasmart.com.br</span>
      </div>
    </div>
  )
}

export default Footer
