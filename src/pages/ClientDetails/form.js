import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'

import {Input, Button, Datepicker} from 'components'

import useMediaQuery from 'utils/mediaQuery'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const validationSchema = yup.object().shape({
  name: yup.string().required('O campo Nome é obrigatório.'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const ClientForm = ({defaultValues}) => {
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
    <form onSubmit={handleSubmit(formSubmit)}>
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
            label={'Código Unico:'}
            error={Boolean(errors.uniqueCode)}
            helperText={getErrorMessage(errors.uniqueCode)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='phone'
            control={control}
            label={'Telefone:'}
            error={Boolean(errors.phone)}
            helperText={getErrorMessage(errors.phone)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={<Datepicker />}
            name='birthdate'
            control={control}
            label={'Data de Nascimento:'}
            error={Boolean(errors.birthdate)}
            helperText={getErrorMessage(errors.birthdate)}
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
  defaultValues: PropTypes.object,
}

export default ClientForm
