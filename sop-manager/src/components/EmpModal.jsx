import { useEffect, useState } from 'react';

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


/* eslint-disable */
const EmpModal = ({ open, handleClose, employee, updatedEmployeeData }) => {
    const [name, setName] = useState(employee.name);
    const [date_of_hire, setDate_of_hire] = useState(employee.date_of_hire);
    const [active, setActive] = useState(employee.active);
    const [trainer, setTrainer] = useState(employee.trainer);
    const [positionId, setPositionId] = useState(employee.position_id);
    const [departmentId, setDepartmentId] = useState(employee.department_id);
    const [siteId, setSiteId] = useState(employee.site_id);
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
        const updatedEmployee = {
            name,
            date_of_hire: formattedDateOfHire,
            active,
            trainer,
            position_id: positionId,
            department_id: departmentId,
            site_id: siteId
        };
        try {
            const response = await axios.put(`http://localhost:3010/api/employee/${employee.id}`, updatedEmployee);
            console.log("Response from server:", response.data);
            updatedEmployeeData(updatedEmployee)
            handleClose();
        } catch (error) {
            console.error('Error updating employee:', error);
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
                                <TableCell><TextField id="standard-basic" value={name} onChange={(e) => setName(e.target.value)} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Date Of Hire:</TableCell>
                                <TableCell><TextField variant='standard' value={date_of_hire} onChange={(e) => setDate_of_hire(e.target.value)} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Active:</TableCell>
                                <TableCell>
                                    <Select 
                                        value={active} 
                                        onChange={(e) => setActive(e.target.value)} 
                                        variant="standard" 
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem> 
                                        <MenuItem value="No">No</MenuItem> 
                                    </Select>
                                </TableCell>                                                   
                            </TableRow>
                            <TableRow>
                                <TableCell>Trainer:</TableCell>
                                <TableCell>
                                    <Select 
                                        value={trainer} 
                                        onChange={(e) => setTrainer(e.target.value)} 
                                        variant="standard" 
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem> 
                                        <MenuItem value="No">No</MenuItem> 
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Position:</TableCell>
                                <TableCell>
                                    <Select
                                        value={positionId}
                                        onChange={(e) => setPositionId(e.target.value)}
                                        variant="standard"
                                    >
                                        {positions.map((position) => (
                                            <MenuItem key={position.ID} value={position.Name}>{position.Name}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Department:</TableCell>
                                <TableCell>
                                    <Select
                                        value={departmentId}
                                        onChange={(e) => setDepartmentId(e.target.value)}
                                        variant="standard"
                                    >
                                        {departments.map((department) => (
                                            <MenuItem key={department.ID} value={department.Name}>{department.Name}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Site:</TableCell>
                                <TableCell>
                                    <Select
                                        value={siteId}
                                        onChange={(e) => setSiteId(e.target.value)}
                                        variant="standard"
                                    >
                                        {sites.map((site) => (
                                            <MenuItem key={site.ID} value={site.Name}>{site.Name}</MenuItem>
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
/* eslint-enable */

export default EmpModal;
