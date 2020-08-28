import React, {useState} from 'react'
import NumberInput from 'components/NumberInput'

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
}

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <NumberInput
        label='Nome da Empresa'
        value={value}
        onChange={event => setValue(event.target.value)}
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
      <br />
      <br />
      value: {value}
    </div>
  )
}
