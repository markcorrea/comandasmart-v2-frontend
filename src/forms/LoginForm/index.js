import React from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, Input, PasswordInput} from 'components'

import {defaultFontFamily, smallerFontSize} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  username: yup.string().required('Usuário é um campo obrigatório'),
  password: yup.string().required('Senha é um campo obrigatório'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const classes = {
  input: {
    fontSize: smallerFontSize,
  },
  buttonRoot: {
    fontFamily: defaultFontFamily,
    margin: '0 auto',
    display: 'block',
  },
}

const LoginForm = ({onSubmit}) => {
  const {handleSubmit, control, errors} = useForm({
    defaultValues: {username: '', password: ''},
    resolver: yupResolver(validationRules),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputFields}>
        <Controller
          as={Input}
          classes={{input: classes.input}}
          name='username'
          control={control}
          label=''
          error={Boolean(errors.username)}
          helperText={getErrorMessage(errors.username)}
        />
        <Controller
          as={PasswordInput}
          className={styles.passwordInput}
          name='password'
          control={control}
          label=''
          error={Boolean(errors.password)}
          helperText={getErrorMessage(errors.password)}
        />
      </div>
      <Button type='submit' classes={{root: classes.buttonRoot}}>
        Entrar
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default LoginForm
