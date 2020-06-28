import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'

import {Button, Datepicker, Input, MaskInput} from 'components'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'

import useMediaQuery from 'utils/mediaQuery'
import useYupValidationResolver from 'utils/useYupValidationResolver'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  name: yup.string().required('Name is required'),
  uniqueCode: yup.string().required('Unique Code is required'),
  email: yup
    .string()
    .email('E-mail format: example@example.com')
    .required('E-mail is required'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const defaultValues = {
  name: '',
  uniqueCode: '',
  email: '',
  phone: '',
  birthDate: new Date(),
}

const validationResolver = useYupValidationResolver(validationRules)

const ClientForm = ({user}) => {
  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)
  const headerButtonClass = {
    root: {
      maxWidth: '200px',
      margin: mediaQuerySmall ? '0 0 10px 20px' : '10px auto 10px',
    },
  }

  const {handleSubmit, control, errors, reset} = useForm({
    defaultValues,
    validationResolver,
  })

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [reset, user])

  const formSubmit = data => {
    console.log('FORM DATA', data)
  }

  useEffect(() => {
    console.log('ERRORS', errors)
  }, [errors])

  return (
    <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
      <div className={styles.fields}>
        <Controller
          as={Input}
          name='name'
          control={control}
          label={'Name'}
          error={Boolean(errors.name)}
          helperText={getErrorMessage(errors.name)}
        />
        <Controller
          as={Input}
          name='uniqueCode'
          control={control}
          label={'Unique Code'}
          error={Boolean(errors.uniqueCode)}
          helperText={getErrorMessage(errors.uniqueCode)}
        />
        <Controller
          as={Input}
          name='email'
          control={control}
          label={'E-mail'}
          error={Boolean(errors.email)}
          helperText={getErrorMessage(errors.email)}
        />
        <Controller
          as={MaskInput}
          name='phone'
          control={control}
          label={'Phone'}
          error={Boolean(errors.phone)}
          helperText={getErrorMessage(errors.phone)}
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
        <Controller
          as={Datepicker}
          name='birthDate'
          control={control}
          label={'Date of Birth'}
          error={Boolean(errors.birthDate)}
          helperText={getErrorMessage(errors.birthDate)}
        />
      </div>
      <div className={styles.buttons}>
        <Button type='button' color='cancel' classes={headerButtonClass}>
          Cancelar
        </Button>
        <Button classes={headerButtonClass}>Salvar</Button>
      </div>
    </form>
  )
}

ClientForm.propTypes = {
  user: PropTypes.object,
}

export default ClientForm
