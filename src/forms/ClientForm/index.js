import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, Datepicker, Input, MaskInput, Select} from 'components'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'

import useMediaQuery from 'utils/mediaQuery'
import {states} from 'utils/states'

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
  email: '',
  cpf: '',
  birth_date: new Date(),
  phone: '',
  address: '',
  city: '',
  state: '',
}

const ClientForm = ({client, onSubmit, onCancel, loading}) => {
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
    if (client) {
      reset(client)
    }
  }, [reset, client])

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
          name='email'
          control={control}
          label={'E-mail'}
          error={Boolean(errors.email)}
          helperText={getErrorMessage(errors.email)}
          disabled={loading}
        />
        <Controller
          as={MaskInput}
          name='cpf'
          control={control}
          label='CPF'
          error={Boolean(errors.cpf)}
          helperText={getErrorMessage(errors.cpf)}
          mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
          disabled={loading}
        />
        <Controller
          as={Datepicker}
          name='birth_date'
          control={control}
          label='Data de Nascimento'
          error={Boolean(errors.birth_date)}
          helperText={getErrorMessage(errors.birth_date)}
          disabled={loading}
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
          as={Select}
          name='state'
          items={states.map(item => ({name: item.name, value: item.initial}))}
          control={control}
          label='Estado'
          showEmptyOption
          disabled={loading}
          isRequired
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

ClientForm.propTypes = {
  client: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

export default ClientForm
