import React, {useState} from 'react'
import UserForm from 'forms/UserForm'

export default {
  title: 'Forms/UserForm',
  component: UserForm,
}

export const Basic = () => {
  const newData = {
    name: 'Marcus Coelho',
    uniqueCode: '1234',
    email: 'mrc.correa@gmail.com',
    permission: '1',
    password: '',
  }

  const [data, setData] = useState({})
  return (
    <div style={{padding: '0 10px'}}>
      <h2>Form:</h2>
      <UserForm user={data} />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(newData)}>Change</button>
    </div>
  )
}
