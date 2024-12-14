import React from 'react';
import { Modal, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 7,
};


const EmpModal = ({ open, handleClose, employee }) => {
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
          
            <strong>Name:</strong> <TextField id="standard-basic" variant="standard" defaultValue={employee.name} /><br />
            <strong>Date Of Hire:</strong> {employee.date_of_hire} <br />
            <strong>Active:</strong> {employee.active} <br />
            <strong>Trainer:</strong> {employee.trainer} <br />
            <strong>Position:</strong> {employee.position_id} <br />
            <strong>Details:</strong> {employee.department_id} <br />
            <strong>Site:</strong> {employee.site_id} <br />
            {/* <TableContainer>
                <TableBody>
                    {employee.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell component="th" scope="row">{employee.name}</TableCell>
                            <TableCell align="right">{employee.date_of_hire}</TableCell>
                            <TableCell align="right">{employee.active}</TableCell>
                            <TableCell align="right">{employee.trainer}</TableCell>
                            <TableCell align="right">{employee.position}</TableCell>
                            <TableCell align="right">{employee.department}</TableCell>
                            <TableCell align="right">{employee.site}</TableCell>
                        </TableRow>
                    ))};
                </TableBody>
            </TableContainer> */}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
        <Button onClick={handleClose} sx={{ mt: 2 }}>Save</Button>
      </Box>
    </Modal>
  );
};

export default EmpModal;
