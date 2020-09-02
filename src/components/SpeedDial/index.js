import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import UISpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'

import Button from 'components/Button'

import {goldTips, lightestGray, saffron} from 'assets/styles/main.module.scss'

import styles from './index.module.scss'

const buttonClasses = classes => ({
  root: {
    marginTop: '10px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    '&&:hover': {
      backgroundColor: lightestGray,
    },
    ...(classes ? classes : {}),
  },
})

const SpeedDialOptions = ({buttons}) => {
  return buttons.map((button, index) => {
    const {label, onClick, classes} = button
    return (
      <Button key={`speed_dial_button_${index}`} classes={buttonClasses(classes)} onClick={onClick}>
        {label}
      </Button>
    )
  })
}

const SpeedDial = ({buttons, positionFixed}) => {
  const useStyles = makeStyles({
    root: {
      position: positionFixed ? 'fixed' : 'absolute',
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

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {positionFixed && <div className={open ? styles.overlay : ''} />}
      <UISpeedDial
        ariaLabel='SpeedDial tooltip example'
        classes={classes}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <SpeedDialOptions buttons={buttons} />
      </UISpeedDial>
    </>
  )
}

SpeedDial.propTypes = {
  buttons: PropTypes.array,
  positionFixed: PropTypes.bool,
}

export default SpeedDial
