import React, {useState} from 'react'
import TextArea from 'components/TextArea'

export default {
  title: 'Components/TextArea',
  component: TextArea,
}

export const Basic = () => {
  const [description, setDescription] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <TextArea label='Breve Descrição' value={description} onChange={event => setDescription(event.target.value)} />
    </div>
  )
}
