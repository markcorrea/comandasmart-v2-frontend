import React, {useContext} from 'react'
import {SnackbarProvider, useSnackbar} from 'notistack'
import PropTypes from 'prop-types'

import {Spinner} from 'components'

const MessageContext = React.createContext(null)

const MessageComponent = ({children}) => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()

  const show = (message, type = 'success') => {
    enqueueSnackbar(message, {variant: type})
  }

  const showLoading = key => {
    key = enqueueSnackbar(
      <>
        <Spinner />
        &nbsp;&nbsp;Loading&nbsp;...
      </>,
      {variant: 'default', persist: true, anchorOrigin: {horizontal: 'center', vertical: 'top'}}
    )
  }

  const hideLoading = key => closeSnackbar(key)

  return <MessageContext.Provider value={{show, showLoading, hideLoading}}>{children}</MessageContext.Provider>
}

const MessageWrapper = ({children}) => (
  <SnackbarProvider
    maxSnack={10}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
    <MessageComponent>{children}</MessageComponent>
  </SnackbarProvider>
)

export default MessageWrapper

export const useMessage = () => {
  return useContext(MessageContext)
}

MessageComponent.propTypes = {
  children: PropTypes.object,
}

MessageWrapper.propTypes = {
  children: PropTypes.object,
}
