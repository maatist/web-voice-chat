import { useState } from 'react'
import './App.css'

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
      <h1>chat en tiempo real con sockets</h1>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Escribe algo"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              fontSize: '16px',
              border: '1px solid #ccc',
            }}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>


      </div>
      <ul style={{ marginTop: '20px', padding: '0', listStyle: 'none' }}>
        {listMessages.map((message, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          >
            {message}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App