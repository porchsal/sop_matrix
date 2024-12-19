import { useEffect, useState } from 'react';
//import React from 'react';
import { Modal, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 7,
};


// eslint-disable-next-line react/prop-types
const NewEmpModal = ({ open, handleClose, addEmployee }) => {
    const [name, setName] = useState();
    const [date_of_hire, setDate_of_hire] = useState();
    const [active, setActive] = useState();
    const [trainer, setTrainer] = useState();
    const [positionId, setPositionId] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [siteId, setSiteId] = useState();
    const [departments, setDepartments] = useState([]); 
    const [positions, setPositions] = useState([]);
    const [sites, SetSites] = useState([]);
    
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3010/api/department');
            setDepartments(response.data);
            const response2 = await axios.get('http://localhost:3010/api/position');
            setPositions(response2.data);
            const response3 = await axios.get('http://localhost:3010/api/sites');
            SetSites(response3.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
}, []);
    
    const formatDateTimeForSQL = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 10);
    };

    const handleSave = async () => {
        const formattedDateOfHire = formatDateTimeForSQL(date_of_hire);
        const newEmployee = {
            name,
            date_of_hire: formattedDateOfHire,
            active,
            trainer,
            position_id: positionId,
            department_id: departmentId,
            site_id: siteId
        };
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post('http://localhost:3010/api/employee/new', newEmployee);
            // const response = await axios.put(`http://localhost:3010/api/employee/${employee.id}`, newEmployee);
            //console.log("Response from server:", response.data);
            addEmployee(newEmployee);
            handleClose();
         } catch (error) {
                console.error('Error adding employee:', error);
            }

            
        };

    

    return (
        
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Employee Information
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TableContainer>
                <TableBody>
                    <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell><TextField id="standard-basic" onChange={(e) => setName(e.target.value)} required /></TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Date Of Hire:</TableCell>
                    <TableCell><TextField variant='standard' onChange={(e) => setDate_of_hire(e.target.value)} required/></TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Active:</TableCell>
                    
                    {/* <TableCell><TextField variant='standard' value={active} onChange={(e) => setActive(e.target.value)} /></TableCell> */}
                    <TableCell>
                        <Select 
                            onChange={(e) => setActive(e.target.value)} 
                            variant="standard" 
                            required
                            >
                                <MenuItem value="Yes">Yes</MenuItem> 
                                <MenuItem value="No">No</MenuItem> 
                        </Select>
                    </TableCell>                                                   

                    </TableRow>
                    <TableRow>
                    <TableCell>Trainer:</TableCell>
                    {/* <TableCell><TextField variant='standard' value={trainer} onChange={(e) => setTrainer(e.target.value)} /></TableCell> */}
                    <TableCell>
                        <Select 
                            onChange={(e) => setTrainer(e.target.value)} 
                            variant="standard" 
                            required
                            >
                                <MenuItem value="Yes">Yes</MenuItem> 
                                <MenuItem value="No">No</MenuItem> 
                        </Select>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Department:</TableCell>
                    {/* <TableCell><TextField variant='standard' value={employee.department_id} onChange={(e) => setDepartmentId(e.target.value)} /></TableCell> */}
                    <TableCell>
                        <Select
                            onChange={(e) => setDepartmentId(e.target.value)}
                            variant="standard"
                            required
                            >
                                {departments.map((department) => (
                                    <MenuItem key={department.id} value={department.dep_name}>{department.dep_name}</MenuItem>
                                ))}
                        </Select>
                    </TableCell>
                    </TableRow>
                    
                    
                    <TableRow>
                    <TableCell>Position:</TableCell>
                    {/* <TableCell><TextField variant='standard' value={employee.position_id} onChange={(e) => setPositionId(e.target.value)} /></TableCell> */}
                    <TableCell>
                        <Select
                            onChange={(e) => setPositionId(e.target.value)}
                            variant="standard"
                            required
                            >
                                {positions.map((position) => (
                                    <MenuItem key={position.id} value={position.position_name}>{position.position_name}</MenuItem>
                                ))}
                        </Select>
                    </TableCell>

                    </TableRow>
                    
                    <TableRow>
                    <TableCell>Site:</TableCell>
                    {/* <TableCell><TextField variant='standard' value={employee.site_id} onChange={(e) => setSiteId(e.target.value)} /></TableCell> */}
                    <TableCell>
                        <Select
                            onChange={(e) => setSiteId(e.target.value)}
                            variant="standard"
                            required
                            >
                                {sites.map((site) => (
                                    <MenuItem key={site.id} value={site.site_name}>{site.site_name}</MenuItem>
                                ))}
                        </Select>
                    </TableCell>


                    </TableRow>
                </TableBody>
            </TableContainer>
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
        <Button onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
      </Box>
    </Modal>
  );
};

export default NewEmpModal;
