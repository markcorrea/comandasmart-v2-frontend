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
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const TerminalForm = ({terminal: defaultValues, onSubmit, onCancel, loading}) => {
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
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [reset, defaultValues])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <Controller
          as={Input}
          disabled={loading}
          name='name'
          control={control}
          label='Nome'
          error={Boolean(errors.name)}
          helperText={getErrorMessage(errors.name)}
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

TerminalForm.propTypes = {
  terminal: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

TerminalForm.defaultProps = {
  loading: false,
}

export default TerminalForm
