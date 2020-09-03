import React, {useState, useEffect, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'

import {useStore} from 'store'

import UserForm from 'forms/UserForm'

import userResponse from 'mocks/user'

import styles from './index.module.scss'

const UserDetails = () => {
  const store = useStore()

  const {userId} = useParams()
  const history = useHistory()

  const [user, setUser] = useState({})

  const fetchUser = useCallback(id => {
    const result = userResponse.data.find(item => item.id === id)
    return result
  }, [])

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    if (userId && userId !== user.id) {
      const newUser = fetchUser(userId)
      setUser(newUser)
    }
  }, [user, fetchUser, setUser, userId])

  return (
    <>
      <header className={styles.header}>
        <h1>{userId ? 'Editar' : 'Criar'} Usuário</h1>
      </header>
      <Paper className={styles.paper}>
        <UserForm user={user} onSubmit={data => console.log('SUBMIT', data)} onCancel={() => history.push('/users')} />
      </Paper>
    </>
  )
}

export default UserDetails
