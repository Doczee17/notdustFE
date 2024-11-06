
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import InvitePage from './pages/InvitePage';
import LeaderboardPage from './pages/LeaderboardPage';
import InviteeSignUpPage from './pages/InviteeSignUpPage';

// Import icons from react-icons
import { FaHome, FaDollarSign, FaUserPlus, FaTrophy } from 'react-icons/fa';

// Custom component to conditionally render the footer
const Footer = () => {
    const location = useLocation();

    // Check if the current path is the WelcomePage
    const isWelcomePage = location.pathname === '/';

    if (isWelcomePage) {
        return null; // Do not render the footer on the WelcomePage
    }

    return (
        <footer style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px 0',
            borderTop: '1px solid #333',
            backgroundColor: '#7d0000',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 1000,
            fontSize: '14px',
        }}>
            <NavLink
                to="/dashboard"
                style={({ isActive }) => ({
                    color: isActive ? '#00f' : '#fff',
                    textDecoration: 'none',
                    textAlign: 'center',
                    flex: 1,
                    padding: '5px 0',
                })}
            >
                <FaHome style={{ fontSize: '24px', marginBottom: '5px' }} />
                <span style={{ display: 'block' }}>Home</span>
            </NavLink>
            <NavLink
                to="/tasks"
                style={({ isActive }) => ({
                    color: isActive ? '#00f' : '#fff',
                    textDecoration: 'none',
                    textAlign: 'center',
                    flex: 1,
                    padding: '5px 0',
                })}
            >
                <FaDollarSign style={{ fontSize: '24px', marginBottom: '5px' }} />
                <span style={{ display: 'block' }}>Earn</span>
            </NavLink>
            <NavLink
                to="/invite"
                style={({ isActive }) => ({
                    color: isActive ? '#00f' : '#fff',
                    textDecoration: 'none',
                    textAlign: 'center',
                    flex: 1,
                    padding: '5px 0',
                })}
            >
                <FaUserPlus style={{ fontSize: '24px', marginBottom: '5px' }} />
                <span style={{ display: 'block' }}>Invite</span>
            </NavLink>
            <NavLink
                to="/leaderboard"
                style={({ isActive }) => ({
                    color: isActive ? '#00f' : '#fff',
                    textDecoration: 'none',
                    textAlign: 'center',
                    flex: 1,
                    padding: '5px 0',
                })}
            >
                <FaTrophy style={{ fontSize: '24px', marginBottom: '5px' }} />
                <span style={{ display: 'block' }}>Leaderboard</span>
            </NavLink>
        </footer>
    );
};

const App = () => {

    // Define the onTaskComplete handler
    const handleTaskComplete = (taskId: string) => {
        console.log(`Task ${taskId} completed`);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                 <Route path="/tasks" element={<TasksPage onTaskComplete={handleTaskComplete} />} />
                <Route path="/invite" element={<InvitePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/invitee-signup" element={<InviteeSignUpPage />} />
            </Routes>

            <Footer /> {/* Render Footer component */}
        </Router>
    );
};

export default App;
