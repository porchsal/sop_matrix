import { useEffect, useState } from 'react';
import { Modal, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';

import DatePickerComponent from './DatePickerComponent';
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
                    <TableCell>
                        <DatePickerComponent date={date_of_hire} setDate={setDate_of_hire} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Active:</TableCell>
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
                    <TableCell>
                        <Select
                            onChange={(e) => setDepartmentId(e.target.value)}
                            variant="standard"
                            required
                            >
                                {departments.map((department) => (
                                    <MenuItem key={department.ID} value={department.ID}>{department.Name}</MenuItem>
                                ))}
                        </Select>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Position:</TableCell>
                    <TableCell>
                        <Select
                            onChange={(e) => setPositionId(e.target.value)}
                            variant="standard"
                            required
                            >
                                {positions.map((position) => (
                                    <MenuItem key={position.ID} value={position.ID}>{position.Name}</MenuItem>
                                ))}
                        </Select>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Site:</TableCell>
                    <TableCell>
                        <Select
                            onChange={(e) => setSiteId(e.target.value)}
                            variant="standard"
                            required
                            >
                                {sites.map((site) => (
                                    <MenuItem key={site.ID} value={site.ID}>{site.Name}</MenuItem>
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
