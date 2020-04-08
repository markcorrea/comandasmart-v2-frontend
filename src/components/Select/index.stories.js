import React, {useState} from 'react'
import Select from 'components/Select'

export default {
  title: 'Components/Select',
  component: Select,
}

const terminals = [
  {
    name: 'Bar',
    value: '1',
  },
  {
    name: 'Tabacaria',
    value: '2',
  },
  {
    name: 'Caixa',
    value: '3',
  },
]

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <Select label='Terminal' items={terminals} value={value} onChange={event => setValue(event.target.value)} />
      <div>{value}</div>
    </div>
  )
}
