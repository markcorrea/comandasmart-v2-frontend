import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, Input, MaskInput, PasswordInput, Select} from 'components'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'

import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  first_name: yup.string().required('Nome é um campo obrigatório'),
  last_name: yup.string().required('Sobrenome é um campo obrigatório'),
  password: yup.string(),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Senha e confirmação de senha devem ser iguais.'),
  email: yup
    .string()
    .email('Digite um e-mail válido, ex: john@gmail.com')
    .required('E-mail é um campo obrigatório'),
  group: yup.string().required('Nível de Acesso é um campo obrigatório'),
  state: yup.string().test('len', 'Máximo de 2 caracteres', val => val.length < 3),
  country: yup.string().test('len', 'Máximo de 2 caracteres', val => val.length < 3),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const defaultValues = {
  name: '',
  uniqueCode: '',
  email: '',
  password: '',
  group: '',
  cpf: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
}

const UserForm = ({user, groups, onSubmit, onCancel, loading}) => {
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
          name='first_name'
          control={control}
          label='Nome'
          error={Boolean(errors.first_name)}
          helperText={getErrorMessage(errors.first_name)}
          disabled={!!user?.first_name || loading}
          isRequired
        />
        <Controller
          as={Input}
          name='last_name'
          control={control}
          label='Sobrenome'
          error={Boolean(errors.last_name)}
          helperText={getErrorMessage(errors.last_name)}
          disabled={!!user?.last_name || loading}
          isRequired
        />
        <Controller
          as={Input}
          name='email'
          control={control}
          label='E-mail'
          error={Boolean(errors.email)}
          helperText={getErrorMessage(errors.email)}
          disabled={!!user?.last_name || loading}
          isRequired
        />
        <Controller
          as={PasswordInput}
          name='password'
          control={control}
          label='Senha'
          error={Boolean(errors.password)}
          helperText={getErrorMessage(errors.password)}
          disabled={loading}
          isRequired={!user?.id}
        />
        <Controller
          as={PasswordInput}
          name='passwordConfirm'
          control={control}
          label='Confirme a Senha'
          error={Boolean(errors.passwordConfirm)}
          helperText={getErrorMessage(errors.passwordConfirm)}
          disabled={loading}
          isRequired={!user?.id}
        />
        <Controller
          as={Select}
          name='group'
          items={groups}
          control={control}
          label='Nível de Acesso'
          showEmptyOption
          disabled={loading}
          isRequired
        />
        <Controller
          as={Input}
          name='cpf'
          control={control}
          label='CPF'
          error={Boolean(errors.cpf)}
          helperText={getErrorMessage(errors.cpf)}
          disabled={!!user?.cpf || loading}
        />
        <Controller
          as={MaskInput}
          name='phone'
          control={control}
          label='Telefone'
          error={Boolean(errors.phone)}
          helperText={getErrorMessage(errors.phone)}
          mask={['+', /\d/, /\d/, '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='address'
          control={control}
          label='Endereço'
          error={Boolean(errors.address)}
          helperText={getErrorMessage(errors.address)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='city'
          control={control}
          label='Cidade'
          error={Boolean(errors.city)}
          helperText={getErrorMessage(errors.city)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='state'
          control={control}
          label='Estado'
          error={Boolean(errors.state)}
          helperText={getErrorMessage(errors.state)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='country'
          control={control}
          label='País'
          error={Boolean(errors.country)}
          helperText={getErrorMessage(errors.country)}
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
  groups: PropTypes.array,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

export default UserForm
