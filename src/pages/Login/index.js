import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import {Button, Drawer, Input, LoginMenu, Paper, PasswordInput} from 'components'

import logo from 'assets/images/logo_login_mobile.svg'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import menu from './menu'

import {defaultFontFamily, smallerFontSize} from 'assets/styles/main.module.scss'
import styles from './index.module.scss'

const classes = {
  input: {
    fontSize: smallerFontSize,
    textTransform: 'uppercase',
  },
  buttonRoot: {
    fontFamily: defaultFontFamily,
    margin: '0 auto',
    display: 'block',
  },
}

const PasswordForgot = () => (
  <a href='http://www.google.com.br' className={styles.passwordForgot}>
    Esqueci minha Senha
  </a>
)

const Login = () => {
  const history = useHistory()
  const mediaSM = useMediaQuery('min', mediaQuerySM)
  const [open, setOpen] = useState(false)

  const Form = () => (
    <>
      {mediaSM ? (
        <div className={styles.title}>Digite Seu Email E Senha</div>
      ) : (
        <img className={styles.logo} alt='logo' src={logo} />
      )}
      <div className={styles.inputFields}>
        <Input classes={{input: classes.input}} />
        <PasswordInput className={styles.passwordInput} />
        {!mediaSM && <PasswordForgot />}
      </div>
      <Button type='submit' classes={{root: classes.buttonRoot}} onClick={() => history.push('/tickets')}>
        Entrar
      </Button>
    </>
  )

  const Desktop = () => (
    <Paper className={styles.paper}>
      <Form />
      <PasswordForgot />
    </Paper>
  )

  const Mobile = () => (
    <>
      <div className={styles.burgerMenu} onClick={() => setOpen(true)}>
        <i className='fas fa-bars'></i>
      </div>
      <div className={styles.containerMobile}>
        <Form />
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
