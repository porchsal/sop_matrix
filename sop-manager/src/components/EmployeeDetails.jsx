/* eslint-disable react/prop-types */

import { Button, Typography } from '@mui/material';


const EmployeeDetails = ({ employee }) => {
  return (
    <div>
      <Typography variant="h6">{employee.name}</Typography>
      <Typography variant="subtitle1">{employee.date_of_hire}</Typography>
      <Typography variant="body2">{employee.position_id}</Typography>
      <Button variant="contained" color="primary">Edit</Button>
    </div>
  );
};

export default EmployeeDetails
