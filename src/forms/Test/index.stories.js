import React, {useState} from 'react'
import Test from 'forms/Test'

export default {
  title: 'Forms/Test',
  component: Test,
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
      <Test defaultValues={data} />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(newData)}>Change</button>
    </div>
  )
}
