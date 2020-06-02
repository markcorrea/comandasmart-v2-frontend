import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
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

const CompanyForm = ({defaultValues}) => {
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
      <h2 className={styles.subtitle}>DADOS DA EMPRESA:</h2>
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
            name='phone'
            control={control}
            label={'Telefone:'}
            error={Boolean(errors.phone)}
            helperText={getErrorMessage(errors.phone)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='address'
            control={control}
            label={'Endereço:'}
            error={Boolean(errors.address)}
            helperText={getErrorMessage(errors.address)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='city'
            control={control}
            label={'Cidade:'}
            error={Boolean(errors.city)}
            helperText={getErrorMessage(errors.city)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='state'
            control={control}
            label={'Estado:'}
            error={Boolean(errors.state)}
            helperText={getErrorMessage(errors.state)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='paid'
            control={control}
            label={'Pagamento:'}
            error={Boolean(errors.paid)}
            helperText={getErrorMessage(errors.paid)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='postalCode'
            control={control}
            label={'Código Postal:'}
            error={Boolean(errors.postalCode)}
            helperText={getErrorMessage(errors.postalCode)}
          />
        </div>
      </div>
      <h2 className={styles.subtitle}>DADOS DO ADMINISTRADOR:</h2>
      <div className={styles.grid}>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='admin.name'
            control={control}
            label={'Nome:'}
            error={Boolean(errors.admin && errors.admin.name)}
            helperText={getErrorMessage(errors.admin && errors.admin.name)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='admin.email'
            control={control}
            label={'E-mail:'}
            error={Boolean(errors.admin && errors.admin.email)}
            helperText={getErrorMessage(errors.admin && errors.admin.email)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='admin.password'
            control={control}
            label={'Senha:'}
            error={Boolean(errors.admin && errors.admin.password)}
            helperText={getErrorMessage(errors.admin && errors.admin.password)}
          />
        </div>
        <div className={styles.flexCell}>
          <Controller
            as={Input}
            name='admin.passwordConfirm'
            control={control}
            label={'Endereço:'}
            error={Boolean(errors.admin && errors.admin.passwordConfirm)}
            helperText={getErrorMessage(errors.admin && errors.admin.passwordConfirm)}
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

CompanyForm.propTypes = {
  defaultValues: PropTypes.object,
}

export default CompanyForm
