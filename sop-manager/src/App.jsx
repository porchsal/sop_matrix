
import './App.css'
import './styles/SignIn.css'
//import { UserProvider } from './components/UserContext'
import Sites from './components/Sites'
import Department from './components/Department'
import Position from './components/Position'
import Employee from './components/Employee'
import Sop from './components/Sop'
import Training from './components/Training'
import NewTraining from './components/NewTraining'
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
// import Sidenav from './components/Sidenav'
import Settings from './components/Settings'
import Topics from './components/Topics'
import Home from './components/Home'
import NewSop from './components/NewSop'
//import FilterEmp from './components/FilterEmp'

function App() {
  
 

  return (
    <div className="App">
     
    
    <BrowserRouter> 
      <Routes>
          <Route path="/" element={<Home />} />
          
          {/* <Route path="/" element={<SignIn />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/positions" element={<Position />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/sop" element={<Sop />} />
          <Route path="/training" element={<Training />} />
          <Route path="/NewTraining" element={<NewTraining />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/sop/newsop" element={<NewSop />} />
          <Route path="/settings" element={<Settings />} /> 
          {/* <Route path="/employee/filter" element={<FilterEmp />} /> */}
      </Routes>
    </BrowserRouter>  
    </div>
  )
}

export default App;
