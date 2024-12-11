import { useState, useEffect } from 'react'; 
import axios from 'axios';

function Sites() {
  const [sites, setSites] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
    useEffect(() => { 
      const fetchData = async () => { 
        try { const response = await axios.get('http://localhost:3010/api/sites'); 
          setSites(response.data); 
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
        { return <p>Error loading sites: {error.message}</p>; }
  
  
  
  return (
    <div>
    <h1>Sites</h1>
     <div> <h2>List of Sites</h2> 
            <ul> 
              {sites.map(site => ( 
                //console.log(site),
                <li key={site.id}>{site.site_name}</li> 
              ))}
              
            </ul>
      </div>
    </div>
      )
}

export default Sites