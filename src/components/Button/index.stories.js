import React from 'react'
import Button from 'components/Button'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Basic = () => (
  <div style={{padding: '0 10px'}}>
    <h2>Button:</h2>
    <Button onClick={() => console.log('clicked here')}>Button text here</Button>
  </div>
)
