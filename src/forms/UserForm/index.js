import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, Input} from 'components'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'

import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  name: yup.string().required('Nome é um campo obrigatório'),
  email: yup.string().email('Digite um e-mail válido, ex: john@gmail.com'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const defaultValues = {
  name: '',
  uniqueCode: '',
  email: '',
  role: '',
  password: '',
}

const UserForm = ({user, onSubmit, onCancel, loading}) => {
  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)
  const headerButtonClass = {
    root: {
      maxWidth: '200px',
      margin: mediaQuerySmall ? '0 0 10px 20px' : '10px auto 10px',
    },
  }

  const {handleSubmit, control, errors, reset} = useForm({
    defaultValues,
    resolver: yupResolver(validationRules),
  })

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [reset, user])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <Controller
          as={Input}
          name='name'
          control={control}
          label='Nome'
          error={Boolean(errors.name)}
          helperText={getErrorMessage(errors.name)}
          disabled={loading}
          isRequired
        />
        <Controller
          as={Input}
          name='uniqueCode'
          control={control}
          label={'Código Único'}
          error={Boolean(errors.uniqueCode)}
          helperText={getErrorMessage(errors.uniqueCode)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='email'
          control={control}
          label={'E-mail'}
          error={Boolean(errors.email)}
          helperText={getErrorMessage(errors.email)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='role'
          control={control}
          label='Nível de Acesso'
          error={Boolean(errors.birthDate)}
          helperText={getErrorMessage(errors.birthDate)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='password'
          control={control}
          label='Senha'
          error={Boolean(errors.password)}
          helperText={getErrorMessage(errors.password)}
          disabled={loading}
        />
      </div>
      <div className={styles.buttons}>
        <Button type='button' color='cancel' classes={headerButtonClass} onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button classes={headerButtonClass} disabled={loading}>
          Salvar
        </Button>
      </div>
    </form>
  )
}

UserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

export default UserForm
