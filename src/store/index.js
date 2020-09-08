import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'

import {useMessage} from 'components/Message'

const StoreContext = React.createContext(null)

const initialState = {
  loggedUser: {
    firstName: 'Savio',
    lastName: 'Canova',
    company: {
      name: 'Kanova Revistaria',
    },
  },
  // loggedUser: null,
  sideMenu: false,
  loading: false,
}

const Store = ({children}) => {
  const {showLoading, hideLoading} = useMessage()
  let loadingStack

  const [state, updateState] = useState(initialState)

  const showMenu = () => !state.sideMenu && updateState(prevState => ({...prevState, sideMenu: true}))

  const setLoading = setLoading => {
    updateState(prevState => ({...prevState, loading: setLoading}))
    setLoading ? showLoading(loadingStack) : hideLoading(loadingStack)
  }

  return <StoreContext.Provider value={{...state, showMenu, setLoading}}>{children}</StoreContext.Provider>
}

Store.propTypes = {
  children: PropTypes.element,
}

export default Store

export const useStore = () => {
  return useContext(StoreContext)
}
