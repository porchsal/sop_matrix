
import './App.css'
import './styles/SignIn.css'
import Sites from './components/Sites'
import Department from './components/Department'
import Position from './components/Position'
import Employee from './components/Employee'
import Sop from './components/Sop'
import Training from './components/Training'
import NewTraining from './components/NewTraining'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import Topics from './components/Topics'
import Home from './components/Home'
import NewSop from './components/NewSop'
import Users from './components/Users'
import NavBar from './components/NavBar'
import TrainingList from './components/TrainingList'
import TrainingDetails from './components/TrainingDetails'
import { useState, useEffect } from 'react'
function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          fetch('http://localhost:3010/api/user', {
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
                  console.log('Logged usuario:', data.username);
              })
              .catch((error) => {
                  console.error('Error fetching user:', error);
              });
      }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        setUsername(storedUsername);
    }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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
            path="/dashboard"
            element={username ? <Dashboard /> : <Navigate to="/" />}
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
            element={username ? <Settings /> : <Navigate to="/" />}
          />
          <Route
            path="/users"
            element={username ? <Users /> : <Navigate to="/" />}
          />
          <Route
            path="/training/sopnumber/:sopNumber"
            element={username ? <TrainingList /> : <Navigate to="/" />}
            />
          <Route
            path="/training/details/:trainingId"
            element={username ? <TrainingDetails /> : <Navigate to="/" />}
          />
      </Routes>
    </BrowserRouter>  

    </div>
   

  )
}

export default App;
