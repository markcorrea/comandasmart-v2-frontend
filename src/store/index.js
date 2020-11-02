import React, {useState, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'

import {useMessage} from 'components/Message'

const StoreContext = React.createContext(null)

const initialState = {
  loggedUser: null,
  sideMenu: false,
  loading: false,
  dialog: {
    open: false,
    header: '',
    body: null,
    onConfirm: null,
  },
}

const Store = ({children}) => {
  const {showLoading, hideLoading} = useMessage()
  let loadingStack

  const [state, updateState] = useState(initialState)

  const showMenu = useCallback(() => !state.sideMenu && updateState(prevState => ({...prevState, sideMenu: true})), [
    updateState,
    state.sideMenu,
  ])

  const setLoading = useCallback(
    setLoading => {
      updateState(prevState => ({...prevState, loading: setLoading}))
      setLoading ? showLoading(loadingStack) : hideLoading(loadingStack)
    },
    [hideLoading, loadingStack, showLoading]
  )

  const confirmationDialog = useCallback(
    ({header, body, onConfirm}) => updateState(prevState => ({...prevState, dialog: {open: true, header, body, onConfirm}})),
    [updateState]
  )

  const closeDialog = useCallback(() => {
    updateState(prevState => ({...prevState, dialog: {open: false, header: '', body: '', onConfirm: null}}))
  }, [updateState])

  const setLoggedUser = useCallback(
    loggedUser => {
      updateState(prevState => ({...prevState, loggedUser: {...loggedUser}}))
    },
    [updateState]
  )

  const unsetLoggedUser = useCallback(() => {
    updateState(prevState => ({...prevState, loggedUser: null}))
  }, [updateState])

  return (
    <StoreContext.Provider
      value={{...state, showMenu, setLoading, confirmationDialog, closeDialog, setLoggedUser, unsetLoggedUser}}>
      {children}
    </StoreContext.Provider>
  )
}

Store.propTypes = {
  children: PropTypes.element,
}

export default Store

export const useStore = () => {
  return useContext(StoreContext)
}
