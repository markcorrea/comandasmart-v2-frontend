import React, {useState, useEffect, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'

import {useStore} from 'store'

import UserForm from 'forms/UserForm'

import useServices from 'services'

import styles from './index.module.scss'

const UserDetails = () => {
  const {showMenu, loading} = useStore()
  const {userId} = useParams()
  const history = useHistory()
  const {getUserById, saveUser} = useServices()

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById(userId)
      if (result) setUser(result.data)
    }

    if (userId) fetchUser()
  }, [userId, getUserById, setUser])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const postUser = useCallback(
    async body => {
      const payload = {
        ...body,
        ...(userId ? {id: userId} : {}),
      }
      const result = await saveUser(payload)
      if (result) history.push(`/users`)
    },
    [userId, saveUser, history]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>{userId ? 'Editar' : 'Criar'} Usuário</h1>
      </header>
      <Paper className={styles.paper}>
        <UserForm user={user} onSubmit={data => postUser(data)} onCancel={() => history.push('/users')} loading={loading} />
      </Paper>
    </>
  )
}

export default UserDetails
