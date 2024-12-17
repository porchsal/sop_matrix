import { useState, useEffect } from 'react'; 
import axios from 'axios';

function Department() {
  const [departments, setDepartments] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
    useEffect(() => { 
      const fetchData = async () => { 
        try { const response = await axios.get('http://localhost:3010/api/department'); 
          setDepartments(response.data); 
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
        { return <p>Error loading departments: {error.message}</p>; }
  
  
  
  return (
    <div>
    <h1>Departments</h1>
     <div> <h2>List of Departments</h2> 
            <ul> 
              {departments.map(department => ( 
                
                <li key={department.id}>{department.dep_name}</li> 
              ))}
              
            </ul>
      </div>
    </div>
      )
}

export default Department