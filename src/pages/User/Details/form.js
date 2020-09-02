import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import PropTypes from 'prop-types'
import * as yup from 'yup'

import {Button, Input} from 'components'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

const validationSchema = yup.object().shape({
  name: yup.string().required('O campo Nome é obrigatório.'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const UserForm = ({defaultValues}) => {
  const {handleSubmit, control, errors, reset} = useForm({
    defaultValues,
    validationSchema,
  })

  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)
  const headerButtonClass = {
    root: {
      margin: mediaQuerySmall ? '0 20px 0 0' : '10px auto 10px',
    },
  }

  const formSubmit = data => {
    console.log('FORM DATA', data)
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
      <div className={styles.grid}>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='name'
            control={control}
            label={'Nome:'}
            error={Boolean(errors.name)}
            helperText={getErrorMessage(errors.name)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='uniqueCode'
            control={control}
            label={'Código Único:'}
            error={Boolean(errors.uniqueCode)}
            helperText={getErrorMessage(errors.uniqueCode)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='email'
            control={control}
            label={'E-mail:'}
            error={Boolean(errors.email)}
            helperText={getErrorMessage(errors.email)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='permission'
            control={control}
            label={'Permissão:'}
            error={Boolean(errors.permission)}
            helperText={getErrorMessage(errors.permission)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='password'
            control={control}
            label={'Senha:'}
            error={Boolean(errors.password)}
            helperText={getErrorMessage(errors.password)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='passwordConfirm'
            control={control}
            label={'Confirmação de Senha:'}
            error={Boolean(errors.passwordConfirm)}
            helperText={getErrorMessage(errors.passwordConfirm)}
          />
        </div>
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

UserForm.propTypes = {
  defaultValues: PropTypes.object,
}

export default UserForm
