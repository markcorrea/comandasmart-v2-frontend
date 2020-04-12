import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Footer from 'components/Footer'
import SideMenu from 'components/SideMenu'

import {useStore} from 'store'

import styles from './index.module.scss'

const items = [
  {
    label: 'Página Inicial',
    icon: 'fa fa-home',
    onClick: () => console.log('Página Inicial'),
  },
  {
    label: 'Comandas',
    icon: 'fa fa-list-alt',
    onClick: () => console.log('Comandas'),
  },
  {
    label: 'Terminais',
    icon: 'fa fa-tablet-alt',
    onClick: () => console.log('Terminais'),
  },
  {
    label: 'Caixas',
    icon: 'fa fa-money-bill-alt',
    onClick: () => console.log('Caixas'),
  },
  {
    label: 'Produtos',
    icon: 'fa fa-tag',
    onClick: () => console.log('Produtos'),
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

const Layout = ({children}) => {
  const store = useStore()

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.content}>
        {store.sideMenu && <SideMenu items={items} className={styles.sideMenu} />}
        <div className={styles.children}>{children}</div>
      </div>
      <Footer className={styles.footer} />
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