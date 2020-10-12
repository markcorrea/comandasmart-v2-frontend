import React, {useState} from 'react'
import QuantityButtons from 'components/QuantityButtons'

export default {
  title: 'Components/QuantityButtons',
  component: QuantityButtons,
}

export const Basic = () => {
  const [counter, setCounter] = useState(0)
  return (
    <div style={{padding: '20px'}}>
      <QuantityButtons counter={counter} setCounter={setCounter} />
    </div>
  )
}
