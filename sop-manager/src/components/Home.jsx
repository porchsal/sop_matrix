import React, { useEffect } from 'react'
import Sidenav from './Sidenav'
//import fetchWithAuto from '../helpers/fetchWithAuto'

function Home() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3010/api/protected-route', {
          method: 'GET',
          headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Not authorized');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError('Error fetching data. Please try again.');
      }
    };
    fetchData();
  }, []);


  return (
    <> 
    <Sidenav />
    <div>
      <h1>Home</h1>



      </div>
    </>
  );
}

export default Home;