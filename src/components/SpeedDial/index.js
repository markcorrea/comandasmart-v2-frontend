import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import UISpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import SaveIcon from '@material-ui/icons/Save'
import PrintIcon from '@material-ui/icons/Print'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'

import Button from 'components/Button'

import {lightestGray, saffron, goldTips} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  fab: {
    backgroundColor: saffron,
    '&&:hover': {
      backgroundColor: goldTips,
    },
  },
  actions: {
    transition: 'opacity .15s ease-in-out',
  },
  actionsClosed: {
    opacity: '0',
  },
})

const buttonClasses = {
  root: {
    marginTop: '10px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    '&&:hover': {
      backgroundColor: lightestGray,
    },
  },
}

const actions = [
  {icon: <FileCopyIcon />, name: 'Copy'},
  {icon: <SaveIcon />, name: 'Save'},
  {icon: <PrintIcon />, name: 'Print'},
  {icon: <ShareIcon />, name: 'Share'},
  {icon: <FavoriteIcon />, name: 'Like'},
]

const SpeedDial = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <UISpeedDial
      ariaLabel='SpeedDial tooltip example'
      classes={classes}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}>
      {actions.map(action => (
        <Button classes={buttonClasses}>{action.name}</Button>
      ))}
    </UISpeedDial>
  )
}

export default SpeedDial
