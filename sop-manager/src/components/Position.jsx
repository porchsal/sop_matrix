import { useState, useEffect } from 'react'; 
import axios from 'axios';

function Position() {
  const [positions, setPositions] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
    useEffect(() => { 
      const fetchData = async () => { 
        try { const response = await axios.get('http://localhost:3010/api/position'); 
          setPositions(response.data); 
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
    <h1>Positions</h1>
     <div> <h2>List of Positions</h2> 
            <ul> 
              {positions.map(position => ( 
                console.log(position),
                <li key={position.id}>{position.position_name}</li> 
              ))}
              
            </ul>
      </div>
    </div>
      )
}

export default Position;