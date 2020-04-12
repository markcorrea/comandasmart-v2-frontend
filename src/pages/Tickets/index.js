import React, {useEffect} from 'react'

import {useStore} from 'store'

const Tickets = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  return <div>tickets screen</div>
}

export default Tickets
