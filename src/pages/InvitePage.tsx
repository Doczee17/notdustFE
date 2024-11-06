import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/Non.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvitePage: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
    const [totalCTS, setTotalCTS] = useState(0);
    const [inviteLink, setInviteLink] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const storedUsername = localStorage.getItem('username');

        if (storedUsername) {
            try {
                const checkRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/check/${storedUsername}`);

                if (!checkRes.data.exists) {
                    navigate('/'); // Redirect to the welcome page
                    return;
                }

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${storedUsername}`);
                setUserName(res.data.userName);

                localStorage.setItem('username', res.data.userName);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load user data.");
            }
        } else {
            setError("No username found in local storage.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Set the current user
    useEffect(() => {
        const setCurrentUser = async () => {
            if (!userName) {
                setError("User name is not available.");
                return;
            }
            try {
                console.log("Setting current user with userName:", userName); // Log the userName being set
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/set-current-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName })
                });
                const data = await response.json();
                console.log("Set current user response:", data); // Log the response from setting current user
                if (!response.ok) {
                    setError(data.message || "Failed to set current user.");
                } else {
                    console.log("Current user set successfully:", data.message);
                }
            } catch (error) {
                console.error("Error setting current user:", error);
                setError("Unable to set current user.");
            }
        };

        if (userName) {
            setCurrentUser();
        }
    }, [userName]);

    // Fetch invite data (invited friends, total CTS earned)
    useEffect(() => {
        const fetchInviteData = async () => {
            if (!userName) {
                setError("User name is not available.");
                return;
            }

            try {
                console.log("Fetching invite data for userName:", userName); // Log the userName for fetching invite data
                const response = await fetch(`${import.meta.env.VITE_API_URL}/invite/invite-data/${userName}`);
                const data = await response.json();
                console.log("Fetched invite data:", data); // Log the fetched invite data
                if (response.ok) {
                    setInvitedFriends(data.invitedFriends);
                    setTotalCTS(data.totalCTS);
                } else {
                    setError(data.message || "Failed to load invite data.");
                }
            } catch (error) {
                console.error("Error fetching invite data:", error);
                setError("Unable to fetch invite data.");
            }
        };

        if (userName) {
            fetchInviteData();
        }
    }, [userName]);

     // Generate invite link for the inviter
     const generateInviteLink = async () => {
        if (!userName) {
            setError("Try Again");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/invite/generate-invite-link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName })
            });
            const data = await response.json();
            if (response.ok) {
                setInviteLink(data.inviteLink);
            } else {
                setError(data.message || "Failed to generate invite link.");
            }
        } catch (error) {
            console.error("Error generating invite link:", error);
            setError("Unable to generate invite link.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        toast.success("Invite link copied to clipboard!");
    };

    return (
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <h2 style={styles.title}>Invite Friends to Get More NDT</h2>
            <h3>Total NDT Earned: <span style={styles.highlight}>{totalCTS}</span></h3>
            <h3>Total Friends Invited: <span style={styles.highlight}>{invitedFriends.length}</span></h3>
    
            <div style={styles.inviteSection}>
                {invitedFriends.length === 0 ? (
                    <>
                        <button onClick={generateInviteLink} style={styles.button}>
                            Generate Invite Link
                        </button>
                        {inviteLink && (
                            <div style={styles.linkContainer}>
                                <p>Share this link with your friends:</p>
                                <input type="text" readOnly value={inviteLink} style={styles.linkInput} />
                                <button onClick={copyToClipboard} style={styles.copyButton}>
                                    Copy Link
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <button onClick={generateInviteLink} style={styles.button}>
                            Invite More Friends
                        </button>
                        <div style={styles.friendsList}>
                            <h3>Invited Friends:</h3>
                            <ul>
                                {invitedFriends.map((friend, index) => (
                                    <li key={index} style={styles.friendItem}>{friend}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
    
            {error && <p style={styles.error}>{error}</p>}
            <ToastContainer />
        </div>
    );
    };
    
    // Define styles as a constant object
    const styles = {
        container: {
            padding: '20px',
            textAlign: 'center' as 'center', // Explicit type for textAlign
            minHeight: '100vh',
        } as React.CSSProperties,
        logo: {
            margin: '20px',
            width: '150px',
        } as React.CSSProperties,
        title: {
            fontWeight: 'bold',
            margin: '20px 0',
        } as React.CSSProperties,
        highlight: {
            fontWeight: 'bold',
            color: '#00f',
        } as React.CSSProperties,
        inviteSection: {
            marginTop: '30px',
        } as React.CSSProperties,
        button: {
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#000',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            margin: '10px 0',
        } as React.CSSProperties,
        linkContainer: {
            marginTop: '20px',
        } as React.CSSProperties,
        linkInput: {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginTop: '10px',
        } as React.CSSProperties,
        copyButton: {
            marginTop: '10px',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#000',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
        } as React.CSSProperties,
        friendsList: {
            marginTop: '20px',
            textAlign: 'left' as 'left',
        } as React.CSSProperties,
        friendItem: {
            listStyleType: 'none',
            padding: '5px 0',
        } as React.CSSProperties,
        error: {
            color: 'red',
            marginTop: '10px',
        } as React.CSSProperties,
    };
    
    export default InvitePage;