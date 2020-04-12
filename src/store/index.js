import React, {useState, useContext, useCallback} from 'react'
import PropTypes from 'prop-types'

const StoreContext = React.createContext(null)

const initialState = {
  loggedUser: {
    firstName: 'Savio',
    lastName: 'Canova',
    company: {
      name: 'Kanova Revistaria'
    }
  },
  // loggedUser: null,
  sideMenu: false,
}

const Store = ({children}) => {
  const [state, updateState] = useState(initialState)

  const showMenu = useCallback(() => !state.sideMenu && updateState(state => ({...state, sideMenu: true})), [
    updateState,
    state.sideMenu,
  ])

  return <StoreContext.Provider value={{...state, showMenu}}>{children}</StoreContext.Provider>
}

Store.propTypes = {
  children: PropTypes.element,
}

export default Store

export const useStore = () => {
  return useContext(StoreContext)
}
