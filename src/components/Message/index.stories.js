import React from 'react'
import MessageProvider, {useMessage} from 'components/Message'

export default {
  title: 'Components/Message',
  component: useMessage,
}

const Message = () => {
  const message = useMessage()

  return (
    <>
      <button onClick={() => message.show('Action completed successfully!', 'success')}>Success</button>
      <br />
      <button onClick={() => message.show('There was an error with the message.', 'error')}>Error</button>
      <br />
      <button onClick={() => message.show('This action is not recommended.', 'warning')}>Warning</button>
      <br />
      <button onClick={() => message.show('Check out this useful info!', 'info')}>Info</button>
      <br />
    </>
  )
}

export const Basic = () => {
  return (
    <MessageProvider>
      <Message />
    </MessageProvider>
  )
}
