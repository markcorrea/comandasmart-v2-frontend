import React from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, PasswordInput} from 'components'

import {defaultFontFamily, smallerFontSize} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  password: yup.string().required('Senha é um campo obrigatório'),
  passwordConfirm: yup.string().required('Confirmação de Senha é um campo obrigatório'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

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

const ResetPasswordForm = ({onSubmit}) => {
  const {handleSubmit, control, errors} = useForm({
    defaultValues: {password: '', passwordConfirm: ''},
    resolver: yupResolver(validationRules),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputFields}>
        <Controller
          as={PasswordInput}
          label='Nova Senha'
          className={styles.passwordInput}
          name='password'
          control={control}
          error={Boolean(errors.password)}
          helperText={getErrorMessage(errors.password)}
        />
        <Controller
          as={PasswordInput}
          label='Confirmação de Senha'
          className={styles.passwordInput}
          name='passwordConfirm'
          control={control}
          error={Boolean(errors.passwordConfirm)}
          helperText={getErrorMessage(errors.passwordConfirm)}
        />
      </div>
      <Button type='submit' classes={{root: classes.buttonRoot}}>
        Entrar
      </Button>
    </form>
  )
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default ResetPasswordForm
