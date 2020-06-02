import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import logo from 'assets/images/logo_footer.svg'

import styles from './index.module.scss'

const Footer = ({className}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.flexItem}>
        <div onClick={() => console.log('Sobre nós')}>Sobre nós</div>
        <div onClick={() => console.log('Contato')}>Contato</div>
        <div onClick={() => console.log('Suporte')}>Suporte</div>
        <div onClick={() => console.log('Seja um revendedor')}>Seja um revendedor</div>
        <div onClick={() => console.log('Termos de uso e Privacidade')}>Termos de uso e Privacidade</div>
      </div>
      <div className={clsx(styles.flexItem, styles.right)}>
        <img alt='logo' src={logo} className={styles.logo} />
        <span>contato@comandasmart.com.br</span>
      </div>
    </div>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
}

Footer.defaultProps = {
  className: '',
}

export default Footer
