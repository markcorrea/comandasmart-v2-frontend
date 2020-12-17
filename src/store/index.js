import React, {useState, useEffect, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'

import {useMessage} from 'components/Message'

const StoreContext = React.createContext(null)

const initialState = {
  loggedUser: null,
  sideMenu: false,
  menus: [],
  requestsLoading: [],
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

  const [state, updateState] = useState(initialState)

  useEffect(() => {
    console.log('REQUESTS LOADING', state.requestsLoading)
    if (state.requestsLoading.length > 0 && !state.loading) {
      updateState(prevState => ({...prevState, loading: true}))
    }

    if (state.requestsLoading.length < 1 && state.loading) {
      updateState(prevState => ({...prevState, loading: false}))
    }
  }, [state.requestsLoading, state.loading, updateState])

  useEffect(() => {
    if (state.loading) {
      showLoading()
    } else {
      hideLoading()
    }
  }, [state.loading, showLoading, hideLoading])

  const addRequestLoading = useCallback(
    request => updateState(prevState => ({...prevState, requestsLoading: [...prevState.requestsLoading, request]})),
    [updateState]
  )

  const removeRequestLoading = useCallback(
    request =>
      updateState(prevState => ({...prevState, requestsLoading: prevState.requestsLoading.filter(item => item !== request)})),
    [updateState]
  )

  const setMenus = useCallback(menus => !state.sideMenu && updateState(prevState => ({...prevState, menus})), [
    updateState,
    state.sideMenu,
  ])

  const showMenu = useCallback(() => !state.sideMenu && updateState(prevState => ({...prevState, sideMenu: true})), [
    updateState,
    state.sideMenu,
  ])

  const hideMenu = useCallback(() => !state.sideMenu && updateState(prevState => ({...prevState, sideMenu: false})), [
    updateState,
    state.sideMenu,
  ])

  const setLoading = useCallback(
    setLoading => {
      updateState(prevState => ({...prevState, loading: setLoading}))
      setLoading ? showLoading() : hideLoading()
    },
    [hideLoading, showLoading]
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

  const resetStore = useCallback(() => {
    updateState(() => ({...initialState}))
  }, [updateState])

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addRequestLoading,
        removeRequestLoading,
        setMenus,
        showMenu,
        hideMenu,
        setLoading,
        confirmationDialog,
        closeDialog,
        setLoggedUser,
        unsetLoggedUser,
        resetStore,
      }}>
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
