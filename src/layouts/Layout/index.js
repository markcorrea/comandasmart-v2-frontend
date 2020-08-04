import React from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Footer, Header, SideMenu} from 'components'

import useMediaQuery from 'utils/mediaQuery'

import {useStore} from 'store'

import {mediaQueryLG, mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const Layout = ({children}) => {
  const history = useHistory()
  const store = useStore()

  const mediaQueryLarge = useMediaQuery('min', mediaQueryLG)
  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)

  const items = [
    {
      label: 'Página Inicial',
      icon: 'fa fa-home',
      onClick: () => console.log('Página Inicial'),
    },
    {
      label: 'Comandas',
      icon: 'fa fa-list-alt',
      onClick: () => history.push('/tickets'),
    },
    {
      label: 'Terminais',
      icon: 'fa fa-tablet-alt',
      onClick: () => history.push('/terminals'),
    },
    {
      label: 'Caixas',
      icon: 'fa fa-money-bill-alt',
      onClick: () => console.log('Caixas'),
    },
    {
      label: 'Produtos',
      icon: 'fa fa-tag',
      onClick: () => history.push('/products'),
    },
    {
      label: 'Clientes',
      icon: 'fa fa-smile',
      onClick: () => history.push('/clients'),
    },
    {
      label: 'Usuários',
      icon: 'fa fa-users',
      onClick: () => console.log('Usuários'),
    },
    {
      label: 'Ajuda',
      icon: 'fa fa-question-circle',
      onClick: () => console.log('Ajuda'),
    },
  ]

  return (
    <div className={styles.container}>
      {mediaQuerySmall && <Header className={styles.header} />}
      <div className={styles.content}>
        {store.sideMenu && mediaQueryLarge && <SideMenu items={items} className={styles.sideMenu} />}
        <div className={styles.children}>{children}</div>
      </div>
      {mediaQuerySmall && <Footer className={styles.footer} />}
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.element,
}

Layout.defaultProps = {
  children: '',
}
