import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'

const LoggedUserInfo = ({userName, userImage, company}) => {
  return (
    <div className={styles.loggedUserInfo}>
      <span className={styles.userName}>{userName}</span>
      <span> | {company}</span>
      <div alt='user' className={styles.userImage} style={{backgroundImage: `url(${userImage})`}}>
        {!userImage && <i className='fa fa-user' />}
      </div>
    </div>
  )
}

LoggedUserInfo.propTypes = {
  userName: PropTypes.string.isRequired,
  userImage: PropTypes.string,
  company: PropTypes.string,
}

LoggedUserInfo.defaultProps = {
  company: 'Master User'
}

export default LoggedUserInfo
