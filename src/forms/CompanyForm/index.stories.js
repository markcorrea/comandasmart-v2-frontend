import React, {useState} from 'react'
import CompanyForm from 'forms/CompanyForm'

export default {
  title: 'Forms/CompanyForm',
  component: CompanyForm,
}

export const Basic = () => {
  const newData = {
    name: 'Kanova Revistaria',
    uniqueCode: '1',
    phone: '(47)99111-5868',
    address: 'Rua Antônio da Veiga, 301',
    city: 'Blumenau',
    state: 'SC',
    paid: '',
    postalCode: '89012-360',
    admin: {
      name: 'Savio Kanova',
      email: 'savio@kanova.com',
      password: '1234',
      address: 'Rua Antônio da Veiga, 301',
    },
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
