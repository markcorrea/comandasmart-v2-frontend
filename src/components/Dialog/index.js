import React, {useCallback} from 'react'

import {Button, Paper} from 'components'

import {makeStyles} from '@material-ui/core/styles'
import UIDialog from '@material-ui/core/Dialog'

import {useStore} from 'store'

import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import styles from './index.module.scss'

const useStyles = makeStyles({
  paper: {
    borderRadius: '5px',
  },
})

const Dialog = () => {
  const classes = useStyles()
  const mediaQuerySmall = useMediaQuery('min', mediaQuerySM)

  const rightButton = {
    root: {
      minWidth: 'initial',
      maxWidth: '200px',
      margin: '5px 0 5px 15px',
      float: mediaQuerySmall ? 'right' : 'none',
    },
  }

  const {
    dialog: {open, header, body, onConfirm},
    closeDialog,
  } = useStore()

  const confirm = useCallback(() => {
    onConfirm()
    closeDialog()
  }, [onConfirm, closeDialog])

  return (
    <UIDialog classes={classes} open={open} maxWidth='sm' fullWidth onBackdropClick={closeDialog} onEscapeKeyDown={closeDialog}>
      <Paper className={styles.container}>
        <div className={styles.header}>{header}</div>
        <div className={styles.body}>{body}</div>
        <div className={styles.buttons}>
          {onConfirm ? (
            <>
              <Button classes={rightButton} onClick={confirm}>
                Confirmar
              </Button>
              <Button color='cancel' classes={rightButton} onClick={closeDialog}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button classes={rightButton} onClick={closeDialog}>
              Fechar
            </Button>
          )}
        </div>
      </Paper>
    </UIDialog>
  )
}

export default Dialog
