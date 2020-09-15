import React, {useState, useCallback} from 'react'
import {useHistory} from 'react-router-dom'

import {Drawer, LoginMenu, Paper} from 'components'

import logo from 'assets/images/logo_login_mobile.svg'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import ResetPasswordForm from 'forms/ResetPasswordForm'

import useServices from 'services'

import menu from 'mocks/menu'

import styles from './index.module.scss'

const RedefinePassword = () => {
  const history = useHistory()
  const mediaSM = useMediaQuery('min', mediaQuerySM)
  const [open, setOpen] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const {changePassword} = useServices()

  const redefinePassword = useCallback(async () => {
    const result = await changePassword()
    if (result) setPasswordSaved(true)
  }, [changePassword, setPasswordSaved])

  const Form = () => (
    <>
      {mediaSM ? <div className={styles.title}>Redefinir Senha</div> : <img className={styles.logo} alt='logo' src={logo} />}
      <div className={styles.fields}>
        {!passwordSaved ? (
          <ResetPasswordForm onSubmit={redefinePassword} />
        ) : (
          <>
            <div className={styles.checkIcon}>
              <i className='fas fa-check-circle' />
            </div>
            <div className={styles.mediumText}>Senha alterada com sucesso!</div>
            <div onClick={() => history.push(`/login`)} className={styles.goToLogin}>
              Efetuar Login
            </div>
          </>
        )}
      </div>
    </>
  )

  const Desktop = () => (
    <Paper className={styles.paper}>
      <Form />
    </Paper>
  )

  const Mobile = () => (
    <>
      <div className={styles.burgerMenu} onClick={() => setOpen(true)}>
        <i className='fas fa-bars'></i>
      </div>
      <div className={styles.containerMobile}>
        <Form />
      </div>
    </>
  )

  return (
    <>
      {mediaSM ? <Desktop /> : <Mobile />}
      <Drawer open={open} setOpen={setOpen}>
        <LoginMenu items={menu} />
      </Drawer>
    </>
  )
}

export default RedefinePassword
