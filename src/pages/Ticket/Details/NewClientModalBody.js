import React, {useCallback} from 'react'
import PropTypes from 'prop-types'

import {useStore} from 'store'
import ClientForm from 'forms/ClientForm'

import useServices from 'services'

const clearPhoneMask = phone =>
  phone
    .replace('(', '')
    .replace(')', '')
    .replace('-', '')
    .replace(' ', '')
    .trim()

const NewClientModalBody = ({onConfirm, closeModal}) => {
  const {loading} = useStore()
  const {saveClient} = useServices()

  const postClient = useCallback(
    async body => {
      const payload = {
        ...body,
        ...(body.birth_date ? {birth_date: new Date(body.birth_date)} : {}),
        ...(body.phone ? {phone: clearPhoneMask(body.phone)} : {}),
      }

      const result = await saveClient(payload)
      if (result) {
        onConfirm(result.data)
        closeModal()
      }
    },
    [saveClient, onConfirm, closeModal]
  )

  return <ClientForm onSubmit={data => postClient(data)} onCancel={closeModal} loading={loading} />
}

export default NewClientModalBody

NewClientModalBody.propTypes = {
  onConfirm: PropTypes.func,
  closeModal: PropTypes.func,
}
