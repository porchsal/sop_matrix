
import './App.css'
import './styles/SignIn.css'
//import { UserProvider } from './components/UserContext'
import Sites from './components/Sites'
import Departments from './components/Department'
import Positions from './components/Position'
import Employees from './components/Employee'
import Sop from './components/Sop'
import Training from './components/Training'
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'


function App() {
  
 

  return (

    <BrowserRouter> 
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/sop" element={<Sop />} />
          <Route path="/training" element={<Training />} />
      </Routes>
    </BrowserRouter>  

  )
}

export default App;
