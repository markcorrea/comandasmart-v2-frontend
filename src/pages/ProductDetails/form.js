import React, {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import PropTypes from 'prop-types'
import * as yup from 'yup'

import {Button, Input} from 'components'

import useMediaQuery from 'utils/mediaQuery'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import styles from './index.module.scss'

const validationSchema = yup.object().shape({
  name: yup.string().required('O campo Nome é obrigatório.'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const ProductForm = ({defaultValues}) => {
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
            name='barCode'
            control={control}
            label={'Código de Barras:'}
            error={Boolean(errors.barCode)}
            helperText={getErrorMessage(errors.barCode)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='uniqueCode'
            control={control}
            label={'Código rápido:'}
            error={Boolean(errors.uniqueCode)}
            helperText={getErrorMessage(errors.uniqueCode)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='quantity'
            control={control}
            label={'Quantidade:'}
            error={Boolean(errors.quantity)}
            helperText={getErrorMessage(errors.quantity)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='price'
            control={control}
            label={'Valor:'}
            error={Boolean(errors.price)}
            helperText={getErrorMessage(errors.price)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='terminal'
            control={control}
            label={'Terminal:'}
            error={Boolean(errors.terminal)}
            helperText={getErrorMessage(errors.terminal)}
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

ProductForm.propTypes = {
  defaultValues: PropTypes.object,
}

export default ProductForm
