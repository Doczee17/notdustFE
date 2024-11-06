import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/Non.png';

const InviteeSignUpPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Get invite code from the URL
    const queryParams = new URLSearchParams(location.search);
    const inviteCode = queryParams.get('inviteCode');

    const handleSignUp = async () => {
        if (!username) {
            setError("Username cannot be empty");
            return;
        }

        if (!inviteCode) {
            setError("Invite code is missing");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/invite/accept-invite/${inviteCode}`, {
                userName: username
            });
            localStorage.setItem('username', username);
            navigate('/dashboard');
        } catch (err) {
            setError("Failed to sign up. Try again.");
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#7d0000',
            color: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <img src={logo} alt="logo" style={{ maxWidth: '200px', height: 'auto' }} />
            <h1>Hello, Welcome to the Game!</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: '10px', margin: '10px 0', borderRadius: '5px' }}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleSignUp} style={{
                color: '#fff',
                backgroundColor: '#00f',
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            }}>
                Sign Up
            </button>
        </div>
    );
};

export default InviteeSignUpPage;