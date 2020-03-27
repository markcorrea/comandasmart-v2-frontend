import React from 'react'
import Paper from 'components/Paper'

export default {
  title: 'Components/Paper',
  component: Paper,
}

export const Basic = () => (
  <div style={{padding: '0 10px', backgroundColor: '#F3F3F3'}}>
    <h2>Paper:</h2>
    <Paper>My paper content</Paper>
  </div>
)
