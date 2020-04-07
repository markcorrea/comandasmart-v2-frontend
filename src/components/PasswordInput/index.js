import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Input from 'components/Input'

import styles from './index.module.scss'

const PasswordInput = ({type, ...rest}) => {
  const [show, setShow] = useState(false)
  const Icon = () => <i className={`far fa-eye${show ? '-slash' : ''} ${styles.icon}`} onClick={() => setShow(!show)} />

  return <Input type={show ? `text` : `password`} endIcon={<Icon />} {...rest} />
}

PasswordInput.propTypes = {
  type: PropTypes.string,
}

export default PasswordInput
