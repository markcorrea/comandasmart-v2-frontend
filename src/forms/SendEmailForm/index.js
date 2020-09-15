import React from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, Input} from 'components'

import {defaultFontFamily, smallerFontSize} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  email: yup.string().required('Digite um e-mail válido'),
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

const SendEmailForm = ({onSubmit}) => {
  const {handleSubmit, control, errors} = useForm({
    defaultValues: {email: ''},
    resolver: yupResolver(validationRules),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.smallText}>Digite o e-mail registrado. Enviaremos um link para a recuperação da senha.</div>
      <div className={styles.inputFields}>
        <Controller
          as={Input}
          classes={{input: classes.input}}
          name='email'
          control={control}
          label=''
          error={Boolean(errors.email)}
          helperText={getErrorMessage(errors.email)}
        />
      </div>
      <Button type='submit' classes={{root: classes.buttonRoot}}>
        Entrar
      </Button>
    </form>
  )
}

SendEmailForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default SendEmailForm
