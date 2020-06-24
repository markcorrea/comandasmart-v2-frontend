import React, {useState} from 'react'
import ClientForm from 'forms/ClientForm'

export default {
  title: 'Forms/ClientForm',
  component: ClientForm,
}

export const Basic = () => {
  const newData = {
    name: 'Yusuke',
    surname: 'Urameshi',
  }

  const [data, setData] = useState()
  return (
    <div style={{padding: '0 10px'}}>
      <h2>Form:</h2>
      <ClientForm defaultValues={data} />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(newData)}>Change</button>
    </div>
  )
}
