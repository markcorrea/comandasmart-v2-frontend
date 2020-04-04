import React, {useState} from 'react'
import SideMenu from 'components/SideMenu'
import Drawer from 'components/Drawer'

export default {
  title: 'Components/SideMenu',
  component: SideMenu,
}

const items = [
  {
    label: 'Página Inicial',
    icon: 'fa-home',
    onClick: () => console.log('Página Inicial'),
  },
  {
    label: 'Comandas',
    icon: 'fa-list-alt',
    onClick: () => console.log('Comandas'),
  },
  {
    label: 'Terminais',
    icon: 'fa-tablet-alt',
    onClick: () => console.log('Terminais'),
  },
  {
    label: 'Caixas',
    icon: 'fa-money-bill-alt',
    onClick: () => console.log('Caixas'),
  },
  {
    label: 'Produtos',
    icon: 'fa-tag',
    onClick: () => console.log('Produtos'),
  },
  {
    label: 'Usuários',
    icon: 'fa-users',
    onClick: () => console.log('Usuários'),
  },
  {
    label: 'Ajuda',
    icon: 'fa-question-circle',
    onClick: () => console.log('Ajuda'),
  },
]

export const Basic = () => (
  <div style={{height: '880px'}}>
    <SideMenu items={items} />
  </div>
)

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open/Close</button>
      <Drawer open={open} setOpen={setOpen}>
        <SideMenu items={items} />
      </Drawer>
    </div>
  )
}
