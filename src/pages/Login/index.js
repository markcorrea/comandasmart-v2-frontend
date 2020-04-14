import React from 'react'

import Paper from 'components/Paper'
import Input from 'components/Input'
import PasswordInput from 'components/PasswordInput'
import Button from 'components/Button'

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

const Login = () => {
  return (
    <Paper className={styles.paper}>
      <div className={styles.title}>Digite Seu Email E Senha</div>
      <form>
        <div className={styles.inputFields}>
          <Input classes={{input: classes.input}} />
          <PasswordInput className={styles.passwordInput} />
        </div>
        <Button classes={{root: classes.buttonRoot}} onClick={() => console.log('clicked button')}>
          Entrar
        </Button>
      </form>
      <a href='http://www.google.com.br' className={styles.passwordForgot}>
        Esqueci minha Senha
      </a>
    </Paper>
  )
}

export default Login
