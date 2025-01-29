import Sidenav from './Sidenav';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Table, TableCell, TextField, TableBody, TableRow, FormControl, FormLabel, FormGroup, Select, TableHead } from '@mui/material';
import { Checkbox, FormControlLabel, Button, MenuItem  } from '@mui/material';
import DatePickerComponent from './DatePickerComponent';
import axios from 'axios';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';

const NewTraining = () =>{
    
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [trainingDate, setTrainingDate] = useState(null);
    const [trainingName, setTrainingName] = useState('');
    const [comments, setComments] = useState('');
    const [selectedSites, setSelectedSites] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [empTrainer, setEmpTrainer] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState([]);
    const [typeTraining, setTypeTraining] = useState([]);
    const [description, setDescription] = useState([]);
    const [assessment, setAssessment] = useState([]);
    const [changeControl, setChangeControl] = useState([]);
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
                return selectedDepartment.includes(position.department_id);
                }
            );
            setFilteredPositions(filtered);
        } else {
            setFilteredPositions([])
        }
    }, [selectedDepartment, positions]);

    useEffect(() => {
        const fetchEmployees = async () => {

            if (!selectedSites.length && !selectedPosition.length && !selectedDepartment.length) {
                setFilteredEmployees([]);
                return;
            } else if (selectedSites.length > 0 || selectedPosition.length > 0 || selectedDepartment.length > 0) {
                try {
                    const response = await axios.get('http://localhost:3010/api/employee/filter', {
                        params: {
                            site_id: selectedSites,
                            position_id: selectedPosition,
                            department_id: selectedDepartment,
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
    }, [selectedSites, selectedPosition, selectedDepartment]);

    const versionLabel = `
    Chief Medical Supplies Ltd./n
    Document No./n
    CF-B2-002/n
    Version 6.0/n
    Effective Date: 2025-01-31/n
    `;


    const handleSiteChange = (event) => {
        const siteId = Number(event.target.value);
        setSelectedSites((prev) =>
            event.target.checked ? [...new Set([...prev, siteId])] : prev.filter((id) => id !== siteId)
        );
    };

    const handleDepartmentChange = (event) => { 
        const departmentId = Number(event.target.value); 
        setSelectedDepartment((prev) => 
            event.target.checked ? [... new Set([...prev, departmentId])] : prev.filter(id => id !== departmentId) 
        ); 
    };
    
    const handlePositionChange = (event) => {
        const positionId = Number(event.target.value);
        setSelectedPosition((prev) =>
            event.target.checked ? [... new Set([...prev, positionId])] : prev.filter(id => id !== positionId)
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
            comments: comments,
            training_date: formattedDate,
            employee_ids:  selectedEmployee,
            type_training: typeTraining,
            description: description,
            assessment: assessment,
            control: changeControl,
            version: versionLabel,
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
    <Box sx={{ mt: 8 }}>

        <Paper>
            <TableHead>
                <Typography variant="h4">New Training</Typography>
            </TableHead>    
                    
                    <TableBody>
                        <TableRow sx={{ display: 'flex'}}>
                            <TableCell sx={{ flex: 1, padding: '16px' }}> 
                                <TextField 
                                    label="Training Name" 
                                    onChange={(e) => setTrainingName(e.target.value)} 
                                    margin="normal" 
                                    variant="outlined" 
                                    sx={{ mt: 2,  
                                        width: '70%',  
                                        '& .MuiInputBase-root': { 
                                            fontSize: '1.25rem', 
                                            }, 
                                        '& .MuiInputLabel-root': { 
                                            fontSize: '1.25rem', 
                                            } 
                                        }} 
                                /> 
                            </TableCell>
                            <TableCell sx={{ flex: 1 }}>
                                <DatePickerComponent
                                date={trainingDate}
                                setDate={setTrainingDate}
                                label="Training Date"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{display:'flex', justifyContent: "center"}}>
                            <TableCell sx={{ flex: 1 }}>
                                <TextField
                                    label="Area(s) of training / Sop Number:"
                                    value={originalTraining.sop_number}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </TableCell>   
                            <TableCell sx={{ flex: 1 }}>
                                <FormControl fullWidth>
                                    <FormLabel component="legend">Qualified Trainer Name:</FormLabel>
                                    <Select 
                                        labelId='Trainer'
                                        value={selectedTrainer}
                                        label="Qualified Trainer Name:"
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
                                    label="SOP Tittle"
                                    value={originalTraining.sop_name}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ display: 'flex', justifyContent: "center" }}>
                            <TableCell sx={{ flex: 1 }} >
                                <TextField  
                                    label="Change Control / Deviation Report Number"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setChangeControl(e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{ flex: 1 }}>
                                <TextField
                                    label="Type of Training"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setTypeTraining(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    label="Description"
                                    multiline
                                    rows={15}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={
                            { display: 'flex', justifyContent: "center" }
                        } >
                            <TableCell sx={
                                { flex: 1 }
                            }>
                                <FormControl >
                                    <FormLabel component="legend">Training Assessment Required?:</FormLabel>
                                    <Select
                                        labelId="Assessment"
                                        value={assessment}
                                        label="Training Assessment Required?:"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e) => setAssessment(e.target.value)}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>

                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    label="Comments"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(e) => setComments(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <Box sx={{ p: 3 }}> 
                            <Paper sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom>Select Employees</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
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