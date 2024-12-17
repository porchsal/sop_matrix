import { useState, useEffect } from 'react'; 
import axios from 'axios';

function Topics() {
  const [topics, setTopics] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
    useEffect(() => { 
      const fetchData = async () => { 
        try { const response = await axios.get('http://localhost:3010/api/topics'); 
          setTopics(response.data); 
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
        { return <p>Error loading topics: {error.message}</p>; }
  
  
  
  return (
    <div>
    <h1>Topics</h1>
     <div> <h2>List of Topics</h2> 
            <ul> 
              {topics.map(topics => ( 
                //console.log(site),
                <li key={topics.id}>{topics.topic_name}</li> 
              ))}
              
            </ul>
      </div>
    </div>
      )
}

export default Topics;