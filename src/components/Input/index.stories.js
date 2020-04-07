import React, {useState} from 'react'
import Input from 'components/Input'

export default {
  title: 'Components/Input',
  component: Input,
}

export const Basic = () => {
  const [company, setCompany] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <Input
        label='NOME DA EMPRESA'
        value={company}
        onChange={event => setCompany(event.target.value)}
        startIcon={<i className='fa fa-trash' />}
        endIcon={<i className='fa fa-eye' />}
      />
    </div>
  )
}
