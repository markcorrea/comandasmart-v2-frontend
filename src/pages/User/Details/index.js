import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'

import {useStore} from 'store'

import UserForm from 'forms/UserForm'

import useServices from 'services'

import styles from './index.module.scss'

const groupsTranslation = {
  waiter: 'Garçom',
  terminal: 'Terminal',
  cashier: 'Caixa',
  manager: 'Gerente',
}

const UserDetails = () => {
  const {showMenu, loading} = useStore()
  const {userId} = useParams()
  const history = useHistory()
  const {getUserById, saveUser, getGroups} = useServices()

  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])

  const fetchGroups = useCallback(async () => {
    const result = await getGroups()
    if (result) {
      const adjustedGroups = result.data.map(item => ({...item, name: groupsTranslation[item.name], value: item.id}))
      setGroups(adjustedGroups)
    }
  }, [getGroups, setGroups])

  const fetchUser = useCallback(async () => {
    const result = await getUserById(userId)
    if (result) setUser(result.data)
  }, [getUserById, userId, setUser])

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [fetchUser, userId])

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const postUser = useCallback(
    async data => {
      const payload = {
        ...(userId ? {id: userId} : {}),
        user: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          username: data.email,
          ...(data.password.length ? {password: data.password} : ''),
        },
        user_profile: {
          ...(data.cpf ? {cpf: data.cpf} : {}),
          ...(data.phone ? {phone: data.phone} : {}),
          ...(data.address ? {address: data.address} : {}),
          ...(data.city ? {city: data.city} : {}),
          ...(data.state ? {state: data.state} : {}),
          ...(data.country ? {country: data.country} : {}),
        },
        group: data.group,
      }

      const result = await saveUser(payload)
      if (result) history.push(`/users`)
    },
    [userId, saveUser, history]
  )

  const formattedUser = useMemo(() => {
    if (user) {
      const {id, ...userProfile} = user.user_profile // eslint-disable-line
      return {
        ...user.user,
        ...userProfile,
        group: user.group,
      }
    }
    return null
  }, [user])

  return (
    <>
      <header className={styles.header}>
        <h1>{userId ? 'Editar' : 'Criar'} Usuário</h1>
      </header>
      <Paper className={styles.paper}>
        <UserForm
          user={formattedUser}
          groups={groups}
          onSubmit={data => postUser(data)}
          onCancel={() => history.push('/users')}
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default memo(UserDetails)
