import React, { useState } from 'react';
import axios from 'axios';

export function Chatbot() {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const sendMessage = async () => {
        const res = await axios.post('http://localhost:5000/chat', { message });
        setResponses([...responses, { user: message, bot: res.data.choices[0].text }]);
        setMessage('');
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <div>
                {responses.map((response, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {response.user}</p>
                        <p><strong>Bot:</strong> {response.bot}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
