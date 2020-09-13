import React, {useCallback} from 'react'

import {Button, Paper} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

import {useStore} from 'store'

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

const ConfirmDialog = () => {
  const classes = useStyles()
  const {
    dialog: {open, header, body, onConfirm},
    closeDialog,
  } = useStore()

  const confirm = useCallback(() => {
    onConfirm()
    closeDialog()
  }, [onConfirm, closeDialog])

  return (
    <Dialog classes={classes} open={open} maxWidth='sm' fullWidth onBackdropClick={closeDialog} onEscapeKeyDown={closeDialog}>
      <Paper className={styles.container}>
        <div className={styles.header}>{header}</div>
        <div className={styles.body}>{body}</div>
        <div className={styles.buttons}>
          <Button color='cancel' classes={rightButton} onClick={closeDialog}>
            Cancelar
          </Button>
          <Button classes={rightButton} onClick={confirm}>
            Confirmar
          </Button>
        </div>
      </Paper>
    </Dialog>
  )
}

export default ConfirmDialog
