import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Drawer, Footer, Header, SideMenu} from 'components'

import useMediaQuery from 'utils/mediaQuery'

import {useStore} from 'store'

import {mediaQueryLG} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const ShowSideMenu = ({open, setOpen, ...props}) => {
  const mediaQueryLarge = useMediaQuery('min', mediaQueryLG)

  return mediaQueryLarge ? (
    <SideMenu {...props} />
  ) : (
    <Drawer open={open} setOpen={setOpen}>
      <SideMenu {...props} />
    </Drawer>
  )
}

ShowSideMenu.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

const Layout = ({children}) => {
  const history = useHistory()
  const store = useStore()

  const [open, setOpen] = useState(false)

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
      onClick: () => history.push(`/cashiers`),
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
      onClick: () => history.push('/users'),
    },
    {
      label: 'Empresas',
      icon: 'fa fa-building',
      onClick: () => history.push('/companies'),
    },
    {
      label: 'Relatórios',
      icon: 'fa fa-scroll',
      onClick: () => history.push('/reports'),
    },
    {
      label: 'Ajuda',
      icon: 'fa fa-question-circle',
      onClick: () => console.log('Ajuda'),
    },
  ]

  return (
    <div className={styles.container}>
      <Header className={styles.header} toggleMenu={() => setOpen(!open)} />
      <div className={styles.content}>
        {store.sideMenu && <ShowSideMenu items={items} className={styles.sideMenu} open={open} setOpen={setOpen} />}
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
