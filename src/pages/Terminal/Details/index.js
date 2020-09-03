import React, {useCallback, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {Paper} from 'components'
import {useStore} from 'store'
import TerminalForm from 'forms/TerminalForm'

import terminalResponse from 'mocks/terminal'

import styles from './index.module.scss'

const TerminalDetails = () => {
  const store = useStore()
  const {terminalId} = useParams()
  const history = useHistory()

  const [terminal, setTerminal] = useState({})

  const fetchTerminal = useCallback(id => {
    const result = terminalResponse.data.find(item => item.id === id)
    return result
  }, [])

  useEffect(() => {
    store.showMenu()
  }, [store])

  useEffect(() => {
    if (terminalId && terminalId !== terminal.id) {
      const newTerminal = fetchTerminal(terminalId)
      setTerminal(newTerminal)
    }
  }, [terminal, fetchTerminal, setTerminal, terminalId])

  return (
    <>
      <header className={styles.header}>
        <h1>{terminalId ? 'Editar' : 'Criar'} Terminal</h1>
      </header>
      <Paper className={styles.paper}>
        <TerminalForm
          terminal={terminal}
          onSubmit={data => console.log('SUBMIT', data)}
          onCancel={() => history.push('/terminals')}
        />
      </Paper>
    </>
  )
}

export default TerminalDetails
