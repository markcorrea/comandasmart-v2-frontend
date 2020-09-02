import React, {useState} from 'react'
import CompanyForm from 'forms/CompanyForm'

export default {
  title: 'Forms/CompanyForm',
  component: CompanyForm,
}

export const Basic = () => {
  const newData = {
    name: 'Marcus Coelho',
    uniqueCode: '1234',
    email: 'mrc.correa@gmail.com',
    phone: '47991115868',
    birthDate: new Date('2014-08-18T21:11:54'),
  }

  const [data, setData] = useState({})
  return (
    <div style={{padding: '0 10px'}}>
      <h2>Form:</h2>
      <CompanyForm company={data} />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(newData)}>Change</button>
    </div>
  )
}
