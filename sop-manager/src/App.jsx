
import './App.css'
import './styles/SignIn.css'
import Sites from './components/Sites'
import Department from './components/Department'
import Position from './components/Position'
import Employee from './components/Employee'
import InactiveEmployee from './components/InactiveEmployee'
import Sop from './components/Sop'
import Training from './components/Training'
import NewTraining from './components/NewTraining'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from './components/SignIn'
import Settings from './components/Settings'
import Topics from './components/Topics'
import Home from './components/Home'
import NewSop from './components/NewSop'
import Users from './components/Users'
import NavBar from './components/NavBar'
import TrainingList from './components/TrainingList'
import TrainingDetails from './components/TrainingDetails'
import InactiveSop from './components/InactiveSop'
import { useState, useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import NotAuthorized from './pages/NotAuthorized'
function App() {
  const [username, setUsername] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          fetch('http://localhost:3010/api/users', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
              .then((response) => {
                  if (!response.ok) {
                      throw new Error('Not authorized');
                  }

                  return response.json();
              })
              .then((data) => {
                  setUsername(data.username);
              })
              .catch((error) => {
                  console.error('Error fetching user:', error);
              });
      }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
        setRole(storedRole);
    }
    if (storedUsername) {
        setUsername(storedUsername);
    }
}, []);

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
      setUsername(null);
  }
  
 

  return (

    <div className="App">
     
    
    <BrowserRouter>
        {username && <NavBar username={username} onLogout={handleLogout} />}
   
      <Routes>
            <Route
                path="/"
                element={username ? <Navigate to="/home" /> : <SignIn setUsername={setUsername} />}
            />
            <Route
            path="/home"
            element={username ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/sites"
            element={username ? <Sites /> : <Navigate to="/" />}
          />
          <Route
            path="/departments"
            element={username ? <Department /> : <Navigate to="/" />}
          />
          <Route
            path="/positions"
            element={username ? <Position /> : <Navigate to="/" />}
          />
          <Route
            path="/employee"
            element={username ? <Employee /> : <Navigate to="/" />}
          />
          <Route
            path="/employee/inactive"
            element={username ? <InactiveEmployee /> : <Navigate to="/" />}
          />
          <Route
            path="/sop"
            element={username ? <Sop /> : <Navigate to="/" />}
          />
          <Route
            path="/training"
            element={username ? <Training /> : <Navigate to="/" />}
          />
          <Route
            path="/NewTraining"
            element={username ? <NewTraining /> : <Navigate to="/" />}
          />
          <Route
            path="/topics"
            element={username ? <Topics /> : <Navigate to="/" />}
          />
          <Route
            path="/sop/newsop"
            element={username ? <NewSop /> : <Navigate to="/" />}
          />
          <Route
          
            path="/settings"
              element={
                <ProtectedRoute roles={['Administrator', 'Manager']}>
                  <Settings />
                </ProtectedRoute >
              }
          />
          <Route
            path="/not-authorized"
            element={<NotAuthorized />}
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={['Administrator', 'Manager']}>
                <Users />
              </ProtectedRoute >
            }
          />
          <Route
            path="/training/sopnumber/:sopNumber"
            element={username ? <TrainingList /> : <Navigate to="/" />}
            />
          <Route
            path="/training/details/:trainingId"
            element={username ? <TrainingDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/training/delete/:trainingId"
            element={username ? <TrainingList /> : <Navigate to="/" />}
          />
          <Route
          path="/sop/inactive"
          element={username ? <InactiveSop /> : <Navigate to="/sop/inactive" />}
          />
      </Routes>
    </BrowserRouter>  

    </div>
   

  )
}

export default App;
