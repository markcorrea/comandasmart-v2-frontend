import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'

import styles from './index.module.scss'

const Modal = ({title, children, onClose, onConfirm}) => {
  return (
    <Dialog open={true}>
      <div className={styles.title}>{title}</div>
      {children}
    </Dialog>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default Modal
