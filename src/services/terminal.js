import {useCallback} from 'react'
import terminals from 'mocks/terminal'

import {useStore} from 'store'
import {useMessage} from 'components/Message'

const useTerminals = () => {
  const {setLoading} = useStore()
  const {show} = useMessage()

  const getTerminals = useCallback(() => {
    return new Promise(resolve => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        resolve(terminals)
      }, 1000)
    })
  }, [setLoading])

  const getTerminalById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(terminals.data.find(terminal => terminal.id === id))
        }, 1000)
      }),
    [setLoading]
  )

  const saveTerminal = useCallback(
    body => {
      if (body.id) {
        // is updating
        return new Promise(resolve => {
          setLoading(true)
          setTimeout(() => {
            show('Terminal salvo com sucesso!')
            setLoading(false)
            resolve(body)
          }, 1000)
        })
      }
      // is creating
      return new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          show('Terminal criado com sucesso!')
          setLoading(false)
          resolve(body)
        }, 1000)
      })
    },
    [setLoading, show]
  )

  const deleteTerminalById = useCallback(
    id =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          show('Terminal removido com sucesso!')
          resolve({data: terminals.data.filter(terminal => terminal.id !== id)})
        }, 1000)
      }),
    [setLoading, show]
  )

  return {
    getTerminals,
    getTerminalById,
    saveTerminal,
    deleteTerminalById,
  }
}

export default useTerminals
