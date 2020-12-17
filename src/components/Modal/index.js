import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {Button, Paper} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

const Modal = ({children, maxWidth, header, onCancel, onConfirm, onUnderstood, open, hideButtons}) => {
  const modalContainer = document.getElementById('modalContainer')
  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)

  const useStyles = makeStyles({
    paper: {
      borderRadius: '5px',
      overflowY: 'auto',
    },
  })

  const classes = useStyles()

  const rightButton = {
    root: {
      minWidth: 'initial',
      maxWidth: '200px',
      margin: '5px 0 5px 15px',
      float: mediaQuerySmall ? 'right' : 'none',
    },
  }

  return ReactDOM.createPortal(
    <Dialog
      classes={classes}
      open={open}
      maxWidth={maxWidth}
      fullWidth
      onBackdropClick={onCancel || onUnderstood}
      onEscapeKeyDown={onCancel || onUnderstood}>
      <Paper noShadow className={styles.container}>
        <div className={styles.header}>{header}</div>
        <div className={styles.body}>{children}</div>
        <div className={styles.buttons}>
          {!hideButtons && onConfirm && (
            <Button classes={rightButton} onClick={onConfirm}>
              Confirmar
            </Button>
          )}
          {!hideButtons && onCancel && (
            <Button color='cancel' classes={rightButton} onClick={onCancel}>
              Cancelar
            </Button>
          )}
          {!hideButtons && onUnderstood && (
            <Button classes={rightButton} onClick={onUnderstood}>
              Entendido
            </Button>
          )}
        </div>
      </Paper>
    </Dialog>,
    modalContainer
  )
}

Modal.propTypes = {
  maxWidth: PropTypes.string,
  header: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onDiscard: PropTypes.func,
  hideButton: PropTypes.bool,
}

Modal.defaultProps = {
  maxWidth: 'sm',
  header: '',
  onCancel: null,
  onConfirm: null,
  onUnderstood: null,
  hideButtons: false,
}

export default Modal
