import React from 'react'
import ResponsiveTable from 'components/ResponsiveTable'

export default {
  title: 'Components/ResponsiveTable',
  component: ResponsiveTable,
}

export const Basic = () => {
  return (
    <div style={{padding: '20px'}}>
      <ResponsiveTable />
    </div>
  )
}
