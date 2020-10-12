import React, {useCallback, useEffect, useState} from 'react'

import {useParams, useHistory} from 'react-router-dom'
import {useStore} from 'store'

import {Paper} from 'components'
import TerminalForm from 'forms/TerminalForm'

import useServices from 'services'

import styles from './index.module.scss'

const TerminalDetails = () => {
  const {showMenu, loading} = useStore()
  const {terminalId} = useParams()
  const history = useHistory()

  const {getTerminalById, saveTerminal} = useServices()

  const [terminal, setTerminal] = useState({name: ''})

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTerminal = async () => {
      const result = await getTerminalById(terminalId)
      if (result) setTerminal(result.data)
    }

    if (terminalId) fetchTerminal(terminalId)
  }, [terminalId, getTerminalById])

  const postTerminal = useCallback(
    async body => {
      const payload = {
        ...body,
        ...(terminalId ? {id: terminalId} : {}),
      }
      const result = await saveTerminal(payload)
      if (result) history.push(`/terminals`)
    },
    [terminalId, saveTerminal, history]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>{terminalId ? 'Editar' : 'Criar'} Terminal</h1>
      </header>
      <Paper className={styles.paper}>
        <TerminalForm
          terminal={terminal}
          onSubmit={data => postTerminal(data)}
          onCancel={() => history.push('/terminals')}
          loading={loading}
        />
      </Paper>
    </>
  )
}

export default TerminalDetails
