import Sidenav from './Sidenav';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Table, TableCell, TextField, TableBody, TableRow, FormControl, FormLabel, FormGroup, Select } from '@mui/material';
import { Checkbox, FormControlLabel, Button, MenuItem,  } from '@mui/material';
import DatePickerComponent from './DatePickerComponent';
import axios from 'axios';

const NewTraining = () =>{
    
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [trainingDate, setTrainingDate] = useState(null);
    const [trainingName, setTrainingName] = useState('');
    const [selectedSites, setSelectedSites] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [empTrainer, setEmpTrainer] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const originalTraining = location.state?.training;
  
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
    const fetchEmpTrainer = async () => {
        try {
            const response = await axios.get('http://localhost:3010/api/employee/trainer');
            setEmpTrainer(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load data. Please try again later.');
        }
    };
    fetchEmpTrainer();
    
}, []);

    useEffect(() => {
        if( selectedDepartment.length > 0) {
            const filtered = positions.filter(position =>{
                console.log('Checking Position:', position);
                return selectedDepartment.includes(position.department_id);
           }
            );
            setFilteredPositions(filtered);
            console.log('Filtered positions:', filtered);
        } else {
            setFilteredPositions([])
        }
    }, [selectedDepartment, positions]);

    useEffect(() => {
        const fetchEmployees = async () => {
            
            if (selectedSites.length > 0 || selectedPosition.length > 0) {
                try {
                    const response = await axios.get('http://localhost:3010/api/employee/filter', {
                        params: {
                            site_id: selectedSites,
                            position_id: selectedPosition,
                        },
                    });
                    setFilteredEmployees(response.data);
                } catch (error) {
                    console.error('Error fetching employees:', error);
                    alert('Failed to load employees, please try again.');
                }
            } else {
                setFilteredEmployees([]);
            }
        };
        fetchEmployees();
    }, [selectedSites, selectedPosition]);

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

    const handleEmployeeChange = (event) => {
        const employeeId = Number(event.target.value);
        setSelectedEmployee((prev) =>
            event.target.checked ? [...prev, employeeId] : prev.filter(id => id !== employeeId)
        );
    };

    const handleTrainerChange = (event) => {
        const trainerId = Number(event.target.value);
        setSelectedTrainer(trainerId);
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
            training_name: trainingName,
            sop_number: originalTraining.sop_number,
            sop_name: originalTraining.sop_name,
            trainer_name: selectedTrainer,
            comments: 'Comments',
            training_date: formattedDate,
            employee_ids:  selectedEmployee,
        };
       
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post('http://localhost:3010/api/training/newtraining', newTraining);
            alert('Training added successfully');
            navigate('/Training');
        } catch (error) {
            console.error('Error adding Training:', error);
            alert('Failed to add Training. Please try again later');
        }
    };


    return (
   <>
    <Sidenav /> 
        <Box >

        <Paper>

                    <Typography variant="h4">New Training</Typography>
                    <TableBody>
                        <TableRow>
                            <TableCell> 
                                <TextField 
                                    label="Training Name" 
                                    onChange={(e) => setTrainingName(e.target.value)} 
                                    margin="normal" 
                                    variant="outlined" // Cambiar a variante "outlined" para un aspecto más moderno 
                                    sx={{ mt: 2, // Agregar margen superior 
                                        width: '70%', // Asegurar que el TextField ocupe todo el espacio disponible 
                                        '& .MuiInputBase-root': { 
                                            fontSize: '1.25rem', // Aumentar el tamaño de la fuente
                                            }, 
                                        '& .MuiInputLabel-root': { 
                                            fontSize: '1.25rem', // Aumentar el tamaño de la etiqueta 
                                            } 
                                        }} // Agregar un poco de margen superior para el espaciado 
                                /> 
                            </TableCell>
                            <TableCell 
                                sx={{ mt: 2, // Agregar margen superior 
                                    width: '50%', // Asegurar que el TextField ocupe todo el espacio disponible 
                                    '& .MuiInputBase-root': { 
                                        fontSize: '1.25rem', // Aumentar el tamaño de la fuente
                                        }, 
                                    '& .MuiInputLabel-root': { 
                                        fontSize: '1.25rem', // Aumentar el tamaño de la etiqueta 
                                        } 
                                    }}
                                    >
                                <DatePickerComponent date={trainingDate} setDate={setTrainingDate} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    label="Sop Number"
                                    value={originalTraining.sop_number}
                                    width="70%"
                                    margin="normal"
                                />
                            </TableCell>   
                            <TableCell>
                                <FormControl fullWidth>
                                    <FormLabel component="legend">Trainer</FormLabel>
                                    <Select 
                                        labelId='Trainer'
                                        value={selectedTrainer}
                                        label="Trainer"
                                        width="50%"
                                        variant="outlined"
                                        required
                                        onChange={handleTrainerChange}
                                    >
                                        {empTrainer.map((trainer) => (
                                            <MenuItem key={trainer.id} value={trainer.id}>
                                            {trainer.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> 
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    label="Sop Name"
                                    value={originalTraining.sop_name}
                                    fullWidth
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    label="Comments"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                        <Box sx={{ p: 3 }}> 
                            <Paper sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom>Select Employees</Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                                {/* <Typography variant="h6">Related to:</Typography> */}
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Main Site</FormLabel>
                                        <FormGroup  >
                                            {sites.map((site) => (
                                                <FormControlLabel
                                                    key={site.ID}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedSites.includes(site.ID)}
                                                            onChange={handleSiteChange}
                                                            value={site.ID}
                                                            name={site.Name}
                                                        />
                                                        }
                                                        label={site.Name}
                                                    />
                                                ))}
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Departments:</FormLabel>
                                            <FormGroup >
                                                {departments.map((department) => (
                                                    <FormControlLabel
                                                        key={department.ID}
                                                        control={
                                                        <Checkbox
                                                            checked={selectedDepartment.includes(department.ID)}
                                                            onChange={handleDepartmentChange}
                                                            value={department.ID}
                                                            name={department.Name}
                                                            />
                                                        }
                                                        label={department.Name}
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
                                                    key={position.ID}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedPosition.includes(position.ID)}
                                                            onChange={handlePositionChange}
                                                            value={position.ID}
                                                            name={position.Name}
                                                        />
                                                        }
                                                    label={position.Name}
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
                                        <Table sx={{ minWidth: 250 }} stickyHeader aria-label="sticky table">
                                            <FormLabel component="legend">Related Employees</FormLabel>
                                            <TableBody>
                                                {filteredEmployees.length > 0 ? (
                                                    filteredEmployees.map((employee) => (
                                                        <TableRow key={employee.id}>
                                                            <TableCell>
                                                                <FormControlLabel
                                                                    key={employee.id}
                                                                    control={
                                                                        <Checkbox
                                                                            checked={selectedEmployee.includes(employee.id)}
                                                                            onChange={handleEmployeeChange}
                                                                            value={employee.id}
                                                                            name={employee.name}
                                                                        />
                                                                    }
                                                                    label={employee.name}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <Typography variant="body1">No employees found</Typography>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </Box>

                                    
                            </Box>
                            </Paper>
                        </Box>
                    </TableBody>
                    
        </Paper>
        </Box>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                                {/* <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>Cancel</Button> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
    
    </>
  );
};

export default NewTraining; 