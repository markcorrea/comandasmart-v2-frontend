import React, {useState, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Drawer, LoginMenu, Paper} from 'components'

import LoginForm from 'forms/LoginForm'

import logo from 'assets/images/logo_login_mobile.svg'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import useServices from 'services'

import menu from 'mocks/menu'

import styles from './index.module.scss'

const Login = () => {
  const history = useHistory()
  const mediaSM = useMediaQuery('min', mediaQuerySM)
  const [open, setOpen] = useState(false)
  const {login} = useServices()

  const loginUser = useCallback(async () => {
    const result = await login()
    if (result) history.push(`/tickets`)
  }, [history, login])

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
      <div className={styles.title}>Digite Seu Email E Senha</div>
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
