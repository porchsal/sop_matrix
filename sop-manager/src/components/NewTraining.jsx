import React from 'react'
import Sidenav from './sidenav';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Paper, TableContainer, Typography, Table, TableCell, TextField, TableBody, TableRow, FormControl, FormLabel, FormGroup } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const NewTraining = () =>{
    //const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [sopNumber, setSopNumber] = useState();
    const [trainingDate, setTrainingDate] = useState();
    const [trainingName, setTrainingName] = useState();
    const [sopNumbers, setSopNumbers] = useState([]);
    //const [siteId, setSiteId] = useState([]);
    //const [departmentId, setDepartmentId] = useState([]);
    const [selectedSites, setSelectedSites] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            // const response = await axios.get('http://localhost:3010/api/position');
            // setPositions(response.data);
            const response2 = await axios.get('http://localhost:3010/api/department');
             setDepartments(response2.data);
            const response3 = await axios.get('http://localhost:3010/api/sites');
            setSites(response3.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);
  
const handleSiteChange = (event) => { 
    const siteId = event.target.value; 
    setSelectedSites((prev) => 
        event.target.checked 
        ? [...prev, siteId] 
        : prev.filter(id => id !== siteId) 
    ); 
};

const handleDeparmentChange = (event) => { 
    const departmentId = event.target.value; 
    setSelectedDepartment((prev) => 
        event.target.checked 
        ? [...prev, departmentId] 
        : prev.filter(id => id !== departmentId) 
    ); 
};

    // const formatDateTimeForSQL = (dateTime) => {
    //     const date = new Date(dateTime);
    //     return date.toISOString().slice(0, 10);
    // };
    return (
   <>
    <Sidenav /> 
    <Box>
        <Typography variant="h4">New Training</Typography>
        <Typography variant="h6">SOP Number: {sopNumber}</Typography>
        <Paper>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Training Date</TableCell>
                            <TableCell>
                                <TextField
                                    label="SOP Effective Date"
                                    value={trainingDate}
                                    onChange={(e) => setTrainingDate(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    />
                            </TableCell>
                            
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                        <TableCell>Training Name</TableCell>
                            <TableCell>
                                <TextField
                                    label="Training Name"
                                    value={trainingName}
                                    
                                    />
                            </TableCell>
                            <TableCell>SOP Numbers:</TableCell>
                            <TableCell>
                                <TextField
                                    label="Sop Number"
                                    value={sopNumbers}
                                    
                                    />
                            </TableCell>    
                        </TableRow>
                        <Box>
                            <Typography variant="h6">Related to:</Typography>
                            <TableRow>
                                <TableCell>
                                    
                                    
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Main Site</FormLabel>
                                        <FormGroup  >
                                            
                                                
                                                {sites.map((site) => (
                                                    <FormControlLabel
                                                        key={site.id}
                                                        control={
                                                            <Checkbox
                                                                checked={Array.isArray(selectedSites) && selectedSites.includes(site.id)}
                                                                onChange={handleSiteChange}
                                                                value={site.id}
                                                                //name={site.site_name}
                                                            />
                                                        }
                                                        label={site.site_name}
                                                    />
                                                ))}
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Departments:</FormLabel>
                                        <FormGroup  >
                                            
                                                
                                                {departments.map((department) => (
                                                    <FormControlLabel
                                                        key={department.id}
                                                        control={
                                                            <Checkbox
                                                                checked={Array.isArray(selectedDepartment) && selectedDepartment.includes(department.id)}
                                                                onChange={handleDeparmentChange}
                                                                value={department.id}
                                                                //name={site.site_name}
                                                            />
                                                        }
                                                        label={department.dep_name}
                                                    />
                                                ))}
                                        </FormGroup>
                                    </FormControl>
                                <TableCell>    
                                    {/* <FormControl component="fieldset">
                                        <FormLabel component="legend">Position</FormLabel>
                                        <FormGroup>
                                            {positions.map((position) => (
                                                <FormControlLabel
                                                    key={position.id}
                                                    control={
                                                        <Checkbox
                                                            checked={position.id}
                                                            onChange={(e) => setDepartmentId(e.target.value)}
                                                            name={position.position_name}
                                                        />
                                                    }
                                                    label={position.position_name}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl> */}
                                    </TableCell>
                                </TableCell>
                            </TableRow>
                        </Box>

                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Box>
    </>
  );
};

export default NewTraining;