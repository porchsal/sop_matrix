import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

function Sites() {
  const [sites, setSites] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
    useEffect(() => { 
      axios.get('/api/sites') 
      .then(response => { 
        if (Array.isArray(response.data)) 
          { setSites(response.data); } 
        else { 
            throw new Error('Response is not an array'); 
          } 
            setLoading(false); 
          })
      .catch(error => { 
        setError(error); 
        setLoading(false); 
        });
       }, []) 
       
       if (loading) 
        { return <p>Loading...</p>; } 
       if (error) 
        { return <p>Error loading sites: {error.message}</p>; }
  
  
  
  return (
    <div>
    <h2>Sites</h2>
     <div> <h1>List of Sites</h1> 
            <ul> 
              {sites.map(site => ( 
                <li key={site.id}>{site.name}</li> 
              ))}
              
            </ul>
      </div>
    </div>
      )
}

export default Sites;