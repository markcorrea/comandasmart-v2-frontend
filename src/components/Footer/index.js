import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import logo from 'assets/images/logo_footer.svg'
import mobileLogo from 'assets/images/comandasmart_white.svg'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

const Footer = ({className}) => {
  const mediaSM = useMediaQuery('min', mediaQuerySM)

  return (
    <div className={clsx(styles.container, className)}>
      <div className={clsx(styles.flexItem, styles.logoItem)}>
        <img alt='logo' src={mediaSM ? logo : mobileLogo} className={styles.logo} />
        <span>contato@comandasmart.com.br</span>
      </div>
      <div className={styles.flexItem}>
        <div onClick={() => console.log('Sobre nós')}>Sobre nós</div>
        <div onClick={() => console.log('Contato')}>Contato</div>
        <div onClick={() => console.log('Suporte')}>Suporte</div>
        <div onClick={() => console.log('Seja um revendedor')}>Seja um revendedor</div>
        <div onClick={() => console.log('Termos de uso e Privacidade')}>Termos de uso e Privacidade</div>
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
