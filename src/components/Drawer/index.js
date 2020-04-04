import React from 'react'
import PropTypes from 'prop-types'

import UIDrawer from '@material-ui/core/Drawer'

const Drawer = ({children, open, setOpen}) => {
  return (
    <UIDrawer open={open} anchor='left' onClose={() => setOpen(false)}>
      {children}
    </UIDrawer>
  )
}

Drawer.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default Drawer
