import React from 'react'
import Modal from 'components/Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
}

export const Outset = () => (
  <div style={{padding: '0 10px', backgroundColor: '#F3F3F3'}}>
    <h2>Modal:</h2>
    <Modal title='titulo do modal'>conteudo do modal</Modal>
  </div>
)
