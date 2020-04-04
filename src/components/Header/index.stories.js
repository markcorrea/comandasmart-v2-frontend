import React from 'react'
import Header from 'components/Header'

export default {
  title: 'Components/Header',
  component: Header,
}

export const Basic = () => (
  <div style={{padding: '0 10px'}}>
    <h2>Header:</h2>
    <Header />
  </div>
)
