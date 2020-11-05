import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import UISpeedDial from '@material-ui/lab/SpeedDial'
import MenuIcon from '@material-ui/icons/Menu'

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

const SpeedDialOptions = ({buttons, setOpen, allDisabled}) => {
  return buttons.map((button, index) => {
    const {label, onClick, classes, disabled} = button

    const clickAndClose = onClick => {
      onClick()
      setOpen(false)
    }
    return (
      <Button
        key={`speed_dial_button_${index}`}
        classes={buttonClasses(classes)}
        onClick={() => clickAndClose(onClick)}
        disabled={disabled || allDisabled}>
        {label}
      </Button>
    )
  })
}

const SpeedDial = ({buttons, positionFixed, disabled}) => {
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
      <div className={open ? styles.overlay : ''} onClick={() => setOpen(false)} />
      <UISpeedDial
        ariaLabel='SpeedDial tooltip example'
        classes={classes}
        icon={<MenuIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <SpeedDialOptions buttons={buttons} setOpen={setOpen} allDisabled={disabled} />
      </UISpeedDial>
    </>
  )
}

SpeedDial.propTypes = {
  buttons: PropTypes.array,
  positionFixed: PropTypes.bool,
  disabled: PropTypes.bool,
}

SpeedDial.defaultProps = {
  disabled: false,
}

export default SpeedDial
