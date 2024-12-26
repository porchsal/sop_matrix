import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { response } from 'express';

export default function FilterEmp({sites, positions}) {
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
    //         if (sites.length === 0 && positions.length === 0) {
    //             setFilteredEmployees([]);
    //             return;
    //         }
    //         try {
    //             const response = await axios.post(
    //                 'http://localhost:3010/api/employee/filter',
    //                 {
    //                     site_id: sites,
    //                     position_id: positions,
    //                 }
    //             );
    //             setFilteredEmployees(response.data);
    //         } catch (error) {
    //             console.error("Error fetching employees:",error);
    //             alert('Faild to load employees, please try again.');
    //             }
    // };

            console.log('Filtered employees:', response.data);
    if (sites.length > 0 || positions.length > 0) { 
        try { const response = await axios.get('http://localhost:3010/api/employee/filter', {
             params: { 
                site_id: sites, 
                position_id: positions, 
            },
         }); 
         setFilteredEmployees(response.data); 
         console.log(response.data);
        } catch (error) { 
            console.error("Error fetching employees:", error); 
            alert('Failed to load employees, please try again.'); 
        } 
    } else { 
        setFilteredEmployees([]); 
    } };
        fetchEmployees();
    }, [sites, positions]);
            

  return (
    <Box>
        <Typography variant="h6">Filtered Employees:</Typography>
        {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
                <Typography key={employee.id}>
                    {employee.name} - {employee.position_name}
                </Typography>
            ))
        ) : (
            <Typography variant="body2">
                No employees found for the selected sites and positions.
            </Typography>
        )}
    </Box>
  )
}
