import Sidenav from './sidenav';
//import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Paper, TableContainer, Typography, Table, TableCell, TextField, TableBody, TableRow, FormControl, FormLabel, FormGroup } from '@mui/material';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import DatePickerComponent from './DatePickerComponent';
import axios from 'axios';
//import FilterEmp from './FilterEmp';

const NewTraining = () =>{
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    //const [sopNumber, setSopNumber] = useState('');
    const [trainingDate, setTrainingDate] = useState(null);
    const [trainingName, setTrainingName] = useState('');
    const [sopNumbers, setSopNumbers] = useState([]);
    const [selectedSites, setSelectedSites] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [positionsRes, departmentsRes, sitesRes] = await Promise.all([
                axios.get('http://localhost:3010/api/position'),
                axios.get('http://localhost:3010/api/department'),
                axios.get('http://localhost:3010/api/sites')
            ]);
            setPositions(positionsRes.data);
            setDepartments(departmentsRes.data);
            setSites(sitesRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load data. Please try again later.');
        }
    };
    fetchData();
}, []);

    useEffect(() => {
        if(selectedDepartment.length > 0) {
            const filtered = positions.filter(position =>
                selectedDepartment.includes(position.department_id)
            );
            setFilteredPositions(filtered);
        } else {
            setFilteredPositions([])
        }
    }, [selectedDepartment, positions]);

    //const navigate = useNavigate();
    const handleSiteChange = (event) => {
        const siteId = Number(event.target.value);
        setSelectedSites((prev) =>
            event.target.checked ? [...prev, siteId] : prev.filter(id => id !== siteId)
        );
    };
    const handleDepartmentChange = (event) => { 
        const departmentId = Number(event.target.value); 
        setSelectedDepartment((prev) => 
            event.target.checked ? [...prev, departmentId] : prev.filter(id => id !== departmentId) 
        ); 
};
    const handlePositionChange = (event) => {
        const positionId = Number(event.target.value);
        setSelectedPosition((prev) =>
            event.target.checked ? [...prev, positionId] : prev.filter(id => id !== positionId)
        );
    };

    const formatDateTimeForSQL = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 10);
    };

    const handleSave = async () => {
        if (!trainingDate || !trainingName || selectedSites.length === 0 || selectedDepartment.length === 0) {
            alert('Please fill in all required fields!');
            return;
          }
    const formattedDate = formatDateTimeForSQL(trainingDate);    
        const newTraining = {
            training_date: formattedDate,
            training_name: trainingName,
            sop_number: sopNumbers,
            site_id: selectedSites,
            department_id: selectedDepartment
        };
        console.log(newTraining);
        try {
            const response = await axios.post('http://localhost:3010/api/training/newtraining', newTraining);
            alert('Training added successfully');
            console.log('New Training:', response.data);
        } catch (error) {
            console.error('Error adding Training:', error);
            alert('Failed to add Training. Please try again later');
        }
    };


    return (
   <>
    <Sidenav /> 
    <Box>
        {/* <Typography variant="h6">SOP Number: {sopNumber}</Typography> */}
        <Paper>
            <TableContainer>
                <Table>
                <Typography variant="h4">New Training</Typography>
                    <TableBody>
                        <TableRow>
                            <TableCell>Training Date</TableCell>
                            <TableCell>
                                    <DatePickerComponent date={trainingDate} setDate={setTrainingDate} />
                                    {console.log(trainingDate)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                        <TableCell>Training Name</TableCell>
                            <TableCell>
                                <TextField
                                    label="Training Name"
                                    onChange={(e) => setTrainingName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    
                                    />
                            </TableCell>
                            <TableCell>SOP Numbers:</TableCell>
                            <TableCell>
                                <TextField
                                    label="Sop Number"
                                    value={sopNumbers}
                                    onChange={(e) => setSopNumbers(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    />
                            </TableCell>    
                        </TableRow>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                            <Typography variant="h6">Related to:</Typography>
                          
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Main Site</FormLabel>
                                        <FormGroup  >
                                            {sites.map((site) => (
                                                <FormControlLabel
                                                    key={site.id}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedSites.includes(site.id)}
                                                            onChange={handleSiteChange}
                                                            value={site.id}
                                                            name={site.site_name}
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
                                                        checked={selectedDepartment.includes(department.id)}
                                                        onChange={handleDepartmentChange}
                                                        value={department.id}
                                                        name={department.dep_name}
                                                        />
                                                    }
                                                    label={department.dep_name}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                    {selectedDepartment.length > 0 && filteredPositions.length > 0 ? ( 
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Position</FormLabel>
                                        <FormGroup>
                                            {filteredPositions.map((position) => (
                                                <FormControlLabel
                                                    key={position.id}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedPosition.includes(position.id)}
                                                            onChange={handlePositionChange}
                                                            value={position.id}
                                                            name={position.position_name}
                                                        />
                                                    }
                                                    label={position.position_name}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                    ) : (
                                        <Box>
                                            <Typography variant="body1">Please select a department to view positions</Typography>
                                        </Box>
                                    )}
                                <Box sx={{mt:3}}>
                                {/* <Typography variant="h6">Related Employees</Typography> */}

                                {/* <FilterEmp sites={selectedSites} positions={selectedPosition}  /> */}
                                {console.log(selectedSites, selectedPosition)}
                            </Box>
                        </Box>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                                {/* <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>Cancel</Button> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Box>
    </>
  );
};

export default NewTraining; 