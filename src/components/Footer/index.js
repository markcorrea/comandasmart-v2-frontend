import React from 'react'
import clsx from 'clsx'

import logo from 'assets/images/logo_footer.svg'

import styles from './index.module.scss'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexItem}>
        <div onClick={() => console.log('Sobre nós')}>Sobre nós</div>
        <div onClick={() => console.log('Sobre nós')}>Contato</div>
        <div onClick={() => console.log('Sobre nós')}>Suporte</div>
        <div onClick={() => console.log('Sobre nós')}>Seja um revendedor</div>
        <div onClick={() => console.log('Sobre nós')}>Termos de uso e Privacidade</div>
      </div>
      <div className={clsx(styles.flexItem, styles.right)}>
        <img alt='logo' src={logo} className={styles.logo} />
        <span>contato@comandasmart.com.br</span>
      </div>
    </div>
  )
}

export default Footer
