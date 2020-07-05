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
  uniqueCode: '',
  brand: '',
  barCode: '',
  unitType: '',
  volumePerUnit: '',
  stock: '',
  price: '',
  pricePerUnit: '',
  terminal: '',
}

const ProductForm = ({product, terminals, onSubmit}) => {
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
    if (product) {
      reset(product)
    }
  }, [reset, product])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <Controller
          as={Input}
          name='name'
          control={control}
          label={'Nome'}
          error={Boolean(errors.name)}
          helperText={getErrorMessage(errors.name)}
        />
        <Controller
          as={NumberInput}
          name='uniqueCode'
          control={control}
          label='Código Único'
          error={Boolean(errors.uniqueCode)}
          helperText={getErrorMessage(errors.uniqueCode)}
        />
        <Controller as={Input} name='brand' control={control} label={'Marca'} />
        <Controller
          as={NumberInput}
          name='barCode'
          control={control}
          label='Código de Barras'
          error={Boolean(errors.barCode)}
          helperText={getErrorMessage(errors.barCode)}
        />
        <Controller as={Input} name='unitType' control={control} label={'Unidade de Medida'} />
        <Controller
          as={NumberInput}
          name='volumePerUnit'
          decimalScale={3}
          thousandSeparator
          control={control}
          label={'Quantidade por Unidade'}
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
        />
        <Controller
          as={NumberInput}
          name='price'
          control={control}
          label='Preço'
          decimalScale={2}
          thousandSeparator
          error={Boolean(errors.price)}
          helperText={getErrorMessage(errors.price)}
        />
        <Controller
          as={NumberInput}
          name='pricePerUnit'
          control={control}
          label='Preço Por Unidade'
          decimalScale={2}
          thousandSeparator
          error={Boolean(errors.pricePerUnit)}
          helperText={getErrorMessage(errors.pricePerUnit)}
        />
        <Controller
          as={Select}
          name='terminal'
          items={terminals}
          control={control}
          label='Terminal'
          error={Boolean(errors.terminal)}
          helperText={getErrorMessage(errors.terminal)}
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

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func,
  terminals: PropTypes.array,
}

ProductForm.defaultProps = {
  terminals: [],
}

export default ProductForm
