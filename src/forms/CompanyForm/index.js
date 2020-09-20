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
  name: yup.string().required('Nome é um campo obrigatório.'),
  admin: yup.object().shape({
    name: yup.string().required('Nome é um campo obrigatório.'),
  }),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const defaultValues = {
  name: '',
  uniqueCode: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  paid: '',
  postalCode: '',
  admin: {
    name: '',
    email: '',
    password: '',
    address: '',
  },
}

const CompanyForm = ({company, onSubmit, onCancel, loading}) => {
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
    if (company) {
      reset(company)
    }
  }, [reset, company])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.subtitle}>DADOS DA EMPRESA:</h2>
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
          name='phone'
          control={control}
          label={'Telefone'}
          error={Boolean(errors.phone)}
          helperText={getErrorMessage(errors.phone)}
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
          name='paid'
          control={control}
          label='Pagamento'
          error={Boolean(errors.paid)}
          helperText={getErrorMessage(errors.paid)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='postalCode'
          control={control}
          label='Código Postal'
          error={Boolean(errors.postalCode)}
          helperText={getErrorMessage(errors.postalCode)}
          disabled={loading}
        />
      </div>
      <h2 className={styles.subtitle}>DADOS DO ADMINISTRADOR:</h2>
      <div className={styles.fields}>
        <Controller
          as={Input}
          name='admin.name'
          control={control}
          label='Nome'
          error={Boolean(errors.admin && errors.admin.name)}
          helperText={getErrorMessage(errors.admin && errors.admin.name)}
          disabled={loading}
          isRequired
        />
        <Controller
          as={Input}
          name='admin.email'
          control={control}
          label='E-mail'
          error={Boolean(errors.email && errors.admin.email)}
          helperText={getErrorMessage(errors.email && errors.admin.email)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='admin.password'
          control={control}
          label='Senha'
          error={Boolean(errors.password && errors.admin.password)}
          helperText={getErrorMessage(errors.password && errors.admin.password)}
          disabled={loading}
        />
        <Controller
          as={Input}
          name='admin.address'
          control={control}
          label='Endereço'
          error={Boolean(errors.address && errors.admin.address)}
          helperText={getErrorMessage(errors.address && errors.admin.address)}
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

CompanyForm.propTypes = {
  company: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

export default CompanyForm
