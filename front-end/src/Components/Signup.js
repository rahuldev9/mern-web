import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailExistsError, setEmailExistsError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const collectData = async () => {
        setError(false);
        setEmailError('');
        setEmailExistsError('');

        if (!name || !email || !password) {
            setError(true);
            return false;
        }

        if (!validateEmail(email)) {
            setEmailError("Enter a valid email address");
            return false;
        }

        let result = await fetch('mern-web-api-omega.vercel.app/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (result.status === 400) {
            const errorResponse = await result.json();
            setEmailExistsError(errorResponse.error);
            return;
        }

        if (result.ok) {
            result = await result.json();
            // localStorage.setItem("user", JSON.stringify(result.result));
            // localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/login');
        } else {
            console.error("Error registering user");
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
            <h1>Register</h1>
            <form style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                <input
                    value={name}
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <span style={{ color: 'red', position: 'relative', right: '45px', bottom: '10px' }}>Enter valid name</span>}

                <input
                    value={email}
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && !email && <span style={{ color: 'red', position: 'relative', right: '45px', bottom: '10px' }}>Enter valid email</span>}
                {emailError && <span style={{ color: 'red', position: 'relative', right: '45px', bottom: '10px' }}>{emailError}</span>}
                {emailExistsError && <span style={{ color: 'red', position: 'relative', right: '45px', bottom: '10px' }}>{emailExistsError}</span>}

                <input
                    value={password}
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && !password && <span style={{ color: 'red', position: 'relative', right: '45px', bottom: '10px' }}>Enter valid password</span>}

                <button onClick={collectData} type="button">Signup</button>
                <p>Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Sign in</Link></p>
            </form>
        </div>
    );
}

export default Signup;
