import React, { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        const result = await fetch('https://mern-api-zuqe.onrender.com/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await result.text(); // Use text() to capture plain responses
        setMessage(response);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Forgot Password</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <button onClick={handleForgotPassword} style={{ marginBottom: '10px' }}>
                Send Reset Link
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
