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
  stock: yup.string().required('Estoque é um campo obrigatório'),
  price: yup.string().required('Preço é um campo obrigatório'),
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
  stock: '',
  price: '',
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
        <Controller as={NumberInput} name='unique_code' control={control} label='Código Único' disabled={loading} />
        <Controller as={Input} name='brand' control={control} label={'Marca'} disabled={loading} />
        <Controller
          as={NumberInput}
          name='bar_code'
          control={control}
          label='Código de Barras'
          error={Boolean(errors.bar_code)}
          helperText={getErrorMessage(errors.bar_code)}
          disabled={loading}
        />
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
          name='volume_per_unit'
          decimalScale={3}
          thousandSeparator
          control={control}
          label='Quantidade por Unidade'
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
          isRequired
        />
        <Controller
          as={NumberInput}
          name='price'
          control={control}
          label='Preço'
          error={Boolean(errors.price)}
          helperText={getErrorMessage(errors.price)}
          thousandSeparator
          decimalScale={2}
          prefix='$ '
          disabled={loading}
          isRequired
        />
        <Controller
          as={NumberInput}
          name='price_per_unit'
          control={control}
          label='Preço Por Unidade'
          decimalScale={2}
          thousandSeparator
          error={Boolean(errors.price_per_unit)}
          helperText={getErrorMessage(errors.price_per_unit)}
          disabled={loading}
        />
        <Controller
          as={Select}
          name='terminal'
          items={terminals}
          control={control}
          label='Terminal'
          error={Boolean(errors.terminal)}
          helperText={getErrorMessage(errors.terminal)}
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
