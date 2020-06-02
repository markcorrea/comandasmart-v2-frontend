import React, {useContext} from 'react'
import {SnackbarProvider, useSnackbar} from 'notistack'
import PropTypes from 'prop-types'

const MessageContext = React.createContext(null)

const MessageComponent = ({children}) => {
  const {enqueueSnackbar} = useSnackbar()

  const show = (message, type = 'success') => {
    enqueueSnackbar(message, {variant: type})
  }

  return <MessageContext.Provider value={{show}}>{children}</MessageContext.Provider>
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
