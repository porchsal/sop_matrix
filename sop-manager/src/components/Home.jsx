/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Sidenav from './Sidenav'


function Home() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      // console.log(localStorage.getItem('username'));
      // console.log("Token:", token);
      // console.log("Role:", localStorage.getItem('role'));
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/api/protected_route', {
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