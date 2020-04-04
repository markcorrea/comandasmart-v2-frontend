import React, {useState} from 'react'
import Drawer from 'components/Drawer'

export default {
  title: 'Components/Drawer',
  component: Drawer,
}

export const Basic = () => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{padding: '0 10px'}}>
      <h2>Drawer:</h2>
      <button onClick={() => setOpen(!open)}>Open/Close</button>
      <Drawer open={open} setOpen={setOpen}>Children</Drawer>
    </div>
  )
}
