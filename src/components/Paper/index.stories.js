import React from 'react'
import Paper from 'components/Paper'

export default {
  title: 'Components/Paper',
  component: Paper,
}

export const Outset = () => (
  <div style={{padding: '0 10px', backgroundColor: '#F3F3F3'}}>
    <h2>Paper:</h2>
    <Paper>
      <div style={{padding: '20px'}}>My paper content</div>
    </Paper>
  </div>
)

export const Inset = () => (
  <div style={{padding: '0 10px', backgroundColor: '#F3F3F3'}}>
    <h2>Paper:</h2>
    <Paper inset>
      <div style={{padding: '20px'}}>My paper content</div>
    </Paper>
  </div>
)
