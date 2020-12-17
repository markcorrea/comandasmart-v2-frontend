import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

import {Button, Input, NumberInput, Select} from 'components'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

const validationRules = yup.object().shape({
  name: yup.string().required('Nome é um campo obrigatório'),
  unique_code: yup.string().test('len', 'Máximo de 4 caracteres', val => val.length < 5),
  stock: yup.string().required('Estoque é obrigatório, mesmo que seja 0'),
  price: yup.string().required('Preço é obrigatório, mesmo que seja 0'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const defaultValues = {
  name: '',
  unique_code: '',
  brand: '',
  bar_code: '',
  unit_type: '',
  volume_per_unit: '',
  stock: 0,
  price: 0,
  price_per_unit: '',
  terminal: '',
}

const ProductForm = ({product, terminals, unitTypes, onSubmit, onCancel, loading}) => {
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
    if (product) reset(product)
  }, [reset, product])

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
          as={NumberInput}
          name='unique_code'
          control={control}
          label='Código Único'
          disabled={loading}
          error={Boolean(errors.unique_code)}
          helperText={getErrorMessage(errors.unique_code)}
        />
        <Controller as={Input} name='brand' control={control} label='Marca' disabled={loading} />
        <Controller as={NumberInput} name='bar_code' control={control} label='Código de Barras' disabled={loading} />
        <Controller
          as={Select}
          name='unit_type'
          items={unitTypes}
          control={control}
          label='Unidades de Medida'
          showEmptyOption
          disabled={loading}
        />
        <Controller
          as={NumberInput}
          name='stock'
          control={control}
          label='Estoque'
          decimalScale={2}
          thousandSeparator
          error={Boolean(errors.stock)}
          helperText={getErrorMessage(errors.stock)}
          disabled={loading}
        />
        <Controller
          as={NumberInput}
          name='price'
          control={control}
          label='Preço'
          thousandSeparator
          decimalScale={2}
          prefix='$ '
          error={Boolean(errors.price)}
          helperText={getErrorMessage(errors.price)}
          disabled={loading}
        />
        <Controller
          as={Select}
          name='terminal'
          items={terminals}
          control={control}
          label='Terminal'
          showEmptyOption
          disabled={loading}
        />
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => onCancel()} type='button' color='cancel' classes={headerButtonClass} disabled={loading}>
          Cancelar
        </Button>
        <Button classes={headerButtonClass} disabled={loading}>
          Salvar
        </Button>
      </div>
    </form>
  )
}

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  terminals: PropTypes.array,
  unitTypes: PropTypes.array,
  loading: PropTypes.bool,
}

ProductForm.defaultProps = {
  terminals: [],
  unitTypes: [],
}

export default ProductForm
