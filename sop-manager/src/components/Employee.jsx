
import { useState, useEffect } from 'react'; 
import axios from 'axios';

function Employee() {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
    useEffect(() => { 
      const fetchData = async () => { 
        try { const response = await axios.get('http://localhost:3010/api/employee'); 
          setEmployees(response.data); 
          setLoading(false);
        } catch (error) { 
          setError(error); 
          setLoading(false); 
        } 
      }; fetchData(); },
      []); 
       if (loading) 
        { return <p>Loading...</p>; } 
       if (error) 
        { return <p>Error loading positions: {error.message}</p>; }
  
  
  
  return (
    <div>
    <h1>Employee</h1>
     <div> <h2>List of Employees</h2> 
            <ul> 
              {employees.map(employee => ( 
                console.log(employee),
                <li key={employee.id}>{employee.name}</li> 
              ))}
              
            </ul>
      </div>
    </div>
      )
}

export default Employee;