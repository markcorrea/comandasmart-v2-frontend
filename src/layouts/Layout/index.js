import React, {useEffect, useState, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Drawer, Footer, Header, SideMenu} from 'components'

import useMediaQuery from 'utils/mediaQuery'

import {useStore} from 'store'
import useServices from 'services'

import {verifyToken, destroyToken} from 'utils/authentication'

import {mediaQueryLG} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const ShowSideMenu = ({open, setOpen, ...props}) => {
  const mediaQueryLarge = useMediaQuery('min', mediaQueryLG)

  return mediaQueryLarge ? (
    <SideMenu {...props} />
  ) : (
    <Drawer open={open} setOpen={setOpen}>
      <SideMenu {...props} onClose={() => setOpen(false)} />
    </Drawer>
  )
}

ShowSideMenu.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

const Layout = ({children}) => {
  const history = useHistory()
  const {sideMenu, setMenus, menus, setLoggedUser, loggedUser} = useStore()
  const {getUserInfoByToken, getMenus} = useServices()

  const [open, setOpen] = useState(false)

  /**
   * Precisa permitir carregar essa página mesmo sem token,
   * pois o <Layout /> é carregado na página de Login.
   */
  const checkLoggedUser = useCallback(async () => {
    const token = verifyToken()

    if (token && !loggedUser) {
      const result = await getUserInfoByToken(token)
      if (result) {
        const userData = {
          ...result.data,
          image: result.data.image || null,
        }
        setLoggedUser(userData)
        const menu = await getMenus()
        if (menu?.data) {
          const menus = menu.data.menus
          setMenus(menus)
          return
        }
      }

      destroyToken()
      return history.push('/login')
    }
  }, [getUserInfoByToken, getMenus, setMenus, setLoggedUser, history, loggedUser])

  useEffect(() => {
    checkLoggedUser()
  }, [checkLoggedUser])

  return (
    <div className={styles.container}>
      <Header className={styles.header} toggleMenu={() => setOpen(!open)} />
      <div className={styles.content}>
        {sideMenu && <ShowSideMenu menus={menus} className={styles.sideMenu} open={open} setOpen={setOpen} />}
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
