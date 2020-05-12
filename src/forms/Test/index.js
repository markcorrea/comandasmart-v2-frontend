import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'

import {Input} from 'components'
import {Button} from '@material-ui/core'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
})

const getErrorMessage = error => {
  return (error && error.message) || ''
}

const FormTest = ({defaultValues}) => {
  const {handleSubmit, control, errors, reset} = useForm({
    defaultValues,
    validationSchema,
  })

  const formSubmit = data => {
    console.log('FORM DATA', data)
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <Controller
        as={Input}
        name='name'
        control={control}
        label={'Name'}
        error={Boolean(errors.name)}
        helperText={getErrorMessage(errors.name)}
      />
      <Controller as={Input} name='surname' control={control} label={'Surname'} />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

FormTest.propTypes = {
  defaultValues: PropTypes.object,
}

export default FormTest
