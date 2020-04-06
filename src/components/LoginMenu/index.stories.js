import React, {useState} from 'react'
import LoginMenu from 'components/LoginMenu'
import Drawer from 'components/Drawer'

export default {
  title: 'Components/LoginMenu',
  component: LoginMenu,
}

const items = [
  {
    label: 'Sobre',
    icon: 'fa fa-info-circle',
    onClick: () => console.log('Sobre'),
  },
  {
    label: 'Contato',
    icon: 'fa fa-envelope',
    onClick: () => console.log('Contato'),
  },
  {
    label: 'Suporte',
    icon: 'fa fa-cog',
    onClick: () => console.log('Suporte'),
  },
  {
    label: 'Instagram',
    icon: 'fab fa-instagram',
    onClick: () => console.log('Instagram'),
  },
  {
    label: 'Facebook',
    icon: 'fab fa-facebook',
    onClick: () => console.log('Facebook'),
  },
  {
    label: 'Twitter',
    icon: 'fab fa-twitter',
    onClick: () => console.log('Twitter'),
  },
]

export const Basic = () => (
  <div style={{height: '880px'}}>
    <LoginMenu items={items} />
  </div>
)

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open/Close</button>
      <Drawer open={open} setOpen={setOpen}>
        <LoginMenu items={items} />
      </Drawer>
    </div>
  )
}

