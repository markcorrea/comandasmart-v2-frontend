import React, {useState} from 'react'
import PasswordInput from 'components/PasswordInput'

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
}

export const Basic = () => {
  const [password, setPassword] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <PasswordInput value={password} onChange={event => setPassword(event.target.value)} />
    </div>
  )
}
