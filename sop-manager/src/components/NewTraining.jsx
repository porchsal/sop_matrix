import React from 'react'
import Sidenav from './sidenav';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NewTraining = () =>{
  const location = useLocation();
  const [sopNumber, setSopNumber] = useState();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sopNumberParams = queryParams.get('sopNumber');
        
        if (sopNumberParams) {
            setSopNumber(sopNumberParams);
        }
    }, [location]);
    
  console.log("LA SOP: ", sopNumber);
    return (
   <>
    <Sidenav /> 
    <div>NewTraining</div>
    <div>{sopNumber}</div>
    </>
  );
};

export default NewTraining;