import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {Button, Paper} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

import styles from './index.module.scss'

const rightButton = {
  root: {
    minWidth: 'initial',
    maxWidth: '200px',
    marginLeft: '15px',
  },
}

const useStyles = makeStyles({
  paper: {
    borderRadius: '5px',
  },
})

const Modal = ({children, header, onCancel, onConfirm, onUnderstood, open}) => {
  const modalContainer = document.getElementById('modalContainer')
  const classes = useStyles()

  return ReactDOM.createPortal(
    <Dialog
      classes={classes}
      open={open}
      maxWidth='sm'
      fullWidth
      onBackdropClick={onCancel || onUnderstood}
      onEscapeKeyDown={onCancel || onUnderstood}>
      <Paper className={styles.container}>
        <div className={styles.header}>{header}</div>
        <div className={styles.body}>{children}</div>
        <div className={styles.buttons}>
          {onCancel && (
            <Button color='cancel' classes={rightButton} onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onConfirm && (
            <Button classes={rightButton} onClick={onConfirm}>
              Confirm
            </Button>
          )}
          {onUnderstood && (
            <Button classes={rightButton} onClick={onUnderstood}>
              Understood
            </Button>
          )}
        </div>
      </Paper>
    </Dialog>,
    modalContainer
  )
}

Modal.propTypes = {
  header: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onDiscard: PropTypes.func,
}

Modal.defaultProps = {
  header: '',
  onCancel: null,
  onConfirm: null,
  onUnderstood: null,
}

export default Modal
