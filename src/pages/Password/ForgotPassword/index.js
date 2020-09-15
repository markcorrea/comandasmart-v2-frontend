import React, {useState, useCallback} from 'react'

import {Drawer, LoginMenu, Paper} from 'components'

import useServices from 'services'

import logo from 'assets/images/logo_login_mobile.svg'
import {mediaQuerySM} from 'assets/styles/_mediaQueries.scss'
import useMediaQuery from 'utils/mediaQuery'

import menu from 'mocks/menu'

import SendEmailForm from 'forms/SendEmailForm'

import styles from './index.module.scss'

const ForgotPassword = () => {
  const mediaSM = useMediaQuery('min', mediaQuerySM)
  const [open, setOpen] = useState(false)
  const [mailSent, setMailSent] = useState(false)

  const {sendRecoverEmail} = useServices()

  const sendEmail = useCallback(async () => {
    let result = await sendRecoverEmail()
    if (result) setMailSent(true)
  }, [sendRecoverEmail, setMailSent])

  const Form = () => (
    <>
      {mediaSM ? <div className={styles.title}>Recuperar Senha</div> : <img className={styles.logo} alt='logo' src={logo} />}
      <div className={styles.fields}>
        {!mailSent ? (
          <SendEmailForm onSubmit={sendEmail} />
        ) : (
          <>
            <div className={styles.checkIcon}>
              <i className='fas fa-check-circle' />
            </div>
            <div className={styles.mediumText}>E-mail enviado com sucesso!</div>
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

export default ForgotPassword
