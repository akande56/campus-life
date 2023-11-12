import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/login';
import HomePage from './pages/Home/home';
import Registration from './pages/Register/register';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
    // Uncomment the following line if you want to redirect to the login page
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" fixed="top">
          <Navbar.Brand as={Link} to="/">
            Campus Life
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            {authenticated ? (
              <Button variant="link" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to="/registration" className="nav-link">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>

        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          {/* Add more routes for other components/pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
