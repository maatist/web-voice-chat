import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3050');
        setSocket(ws);


        ws.onmessage = (event) => {
            console.log('event', event);
            console.log('data', event.data);
            const eventParsed = JSON.parse(event.data);
            if (eventParsed.type === 'history') {
                setMessages(eventParsed.data.reverse());

            } else if (eventParsed.type === 'message') {
                setMessages((prev) => [eventParsed.data, ...prev]);
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim() === '' || !socket) return;
        socket.send(message);
        setMessage('');
    };

    return (
        < div >
            <h1>Chat anonimo</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', padding: '10px' }}>
                <input
                    style={{ flex: 1 }}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>

            <div style={{ padding: '10px', maxWidth: '600px', maxHeight: '800px', overflowY: 'auto' }}>
                {messages.length === 0 && <div style={{ textAlign: 'center', color: '#999' }}>No hay mensajes</div>}
                {messages.map((msg) => (
                    <div key={msg.id} style={{ padding: '5px', borderBottom: '1px solid #ccc', marginBottom: '5px' }}>
                        {typeof msg.text === 'string' ? msg.text : 'Mensaje inválido'}
                    </div>
                ))}

            </div>

        </div >
    );
};

export default Chat;