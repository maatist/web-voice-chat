import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'

function App() {
  const [listMessages, setListMessages] = useState([])
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim() === '') return

    // TODO: Implementar la lógica para enviar el mensaje al WebSocket
    console.log('Mensaje enviado al WebSocket:', message)

    setListMessages((prev) => [message, ...prev])
    setMessage('')
  }

  return (
    <>
      <Chat />
    </>
  )
}

export default App