import React, {useState} from 'react'
import Datepicker from 'components/Datepicker'

export default {
  title: 'Components/Datepicker',
  component: Datepicker,
}

export const Basic = () => {
  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'))

  return (
    <div style={{padding: '20px'}}>
      <Datepicker label='Data de Nascimento' value={value} onChange={setValue} />
    </div>
  )
}
