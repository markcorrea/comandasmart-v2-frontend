import React, {useState} from 'react'
import MaskInput from 'components/MaskInput'

export default {
  title: 'Components/MaskInput',
  component: MaskInput,
}

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <MaskInput
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
