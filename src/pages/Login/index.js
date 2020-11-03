import React, {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Drawer, LoginMenu, Paper} from 'components'

import LoginForm from 'forms/LoginForm'

import logo from 'assets/images/logo_login_mobile.svg'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import {destroyToken} from 'utils/authentication'

import {useStore} from 'store'

import useServices from 'services'

import menu from 'mocks/menu'

import styles from './index.module.scss'

const Login = () => {
  const history = useHistory()
  const mediaSM = useMediaQuery('min', mediaQuerySM)
  const [open, setOpen] = useState(false)
  const {login, getUserInfoByToken, getMenus} = useServices()
  const {hideMenu, setLoggedUser, resetStore, setMenus} = useStore()

  useEffect(() => {
    hideMenu()
    resetStore()
    destroyToken()
  }, [hideMenu, resetStore])

  const loginUser = useCallback(
    async userdata => {
      const result = await login(userdata)
      if (result) {
        const userResult = await getUserInfoByToken(result.token)
        const userData = {
          ...userResult.data,
          image: userResult.data.image || null,
        }
        setLoggedUser(userData)
        const menu = await getMenus()
        if (menu?.data) {
          const menus = menu.data.menus
          setMenus(menus)
          history.push(menus[0].href)
          return
        }

        history.push(`/help`)
      }
    },
    [history, login, setLoggedUser, getUserInfoByToken, getMenus, setMenus]
  )

  const Forms = () => (
    <div className={styles.fields}>
      <LoginForm onSubmit={loginUser} />
      <div onClick={() => history.push(`/forgot_password/`)} className={styles.passwordForgot}>
        Esqueci minha Senha
      </div>
    </div>
  )

  const Desktop = () => (
    <Paper className={styles.paper}>
      <div className={styles.title}>Digite Seu Usuário E Senha</div>
      <Forms />
    </Paper>
  )

  const Mobile = () => (
    <>
      <div className={styles.burgerMenu} onClick={() => setOpen(true)}>
        <i className='fas fa-bars'></i>
      </div>
      <div className={styles.containerMobile}>
        <img className={styles.logo} alt='logo' src={logo} />
        <Forms />
      </div>
    </>
  )

  return (
    <>
      {mediaSM ? <Desktop /> : <Mobile />}
      <Drawer open={open} setOpen={setOpen}>
        <LoginMenu items={menu} />
      </Drawer>
    </>
  )
}

export default Login
