import React from 'react';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Sidenav from './sidenav';
import { Container, Box, Typography, Paper,  Button, TablePagination, List } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EmpModal from './EmpModal';

function Employee() {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (employee) => { 
    setSelectedEmployee(employee); 
    setOpen(true); 
  };
  const handleChangePage = (event, newPage) => {
        setPage(newPage);
      }  
  const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(event.target.value);
          setPage(0);
        };
  const handleClose = () => {setOpen(false);};

  useEffect(() => { 
      const fetchData = async () => { 
        try { const response = await axios.get('http://localhost:3010/api/employee'); 
          setEmployees(response.data); 
          setLoading(false);
        } catch (error) { 
          setError(error); 
          setLoading(false); 
        } 
      }; fetchData(); },
      []); 
      
      
      if (loading) 
        { return <p>Loading...</p>; } 
       if (error) 
        { return <p>Error loading positions: {error.message}</p>; }
      
      const tablePaginationComponent = <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={employees.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage} 
      />
  
      
  
  return (


    <>
      <Sidenav />
      <h1>Employee Management</h1>
      {/* <Typography variant="h4" gutterBottom>Employee Management</Typography> */}
        
        
        <Container>  
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Paper elevation={3} sx={{ flex: 1, marginRight: 2, padding: 2 }} >
              {/* <Typography variant="h6" gutterBottom>Employees</Typography> */}
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow 
                      key={employee.id} 
                      hover onClick={() => handleSelectEmployee(employee)}>
                        <TableCell component="th" scope="row">{employee.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {tablePaginationComponent}
            </Paper>
            
             <Paper elevation={3} style={{ flex: 1, padding: 2 }}>
              <Typography variant="h6" gutterBottom>Employee Details</Typography>
              {selectedEmployee ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                  <TableHead>
                    {/* <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>  */}
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedEmployee).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                      // <TableRow key={key}>
                      //   <TableCell key={selectedEmployee.id}>Name</TableCell><TableCell>{selectedEmployee.name}</TableCell>
                      // </TableRow>
                    ))}
                    
                  </TableBody>
                  
                  {/* <TableBody>
                    {selectedEmployee.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell key={employee.id} >{employee.name}</TableCell>
                         <TableCell key={employee.id} >{employee.date_of_hire}</TableCell>
                         <TableCell key={employee.id} >{employee.active}</TableCell>
                         <TableCell key={employee.id} >{employee.trainer}</TableCell>
                         <TableCell key={employee.id} >{employee.position_id}</TableCell>
                         <TableCell key={employee.id} >{employee.department_id}</TableCell>
                         <TableCell key={employee.id} >{employee.site_id}</TableCell>
                      </TableRow>
                      
                   )) }
                  </TableBody>  */}
                </Table>
                <Button variant="contained" color="primary" onClick={() => handleEditEmployee(selectedEmployee)}>Edit</Button>
              </TableContainer>
              ) : (
              <Typography variant="body1">Select an employee</Typography>
              )}
              
            </Paper>



          </Box>
          <Button variant="contained" color="primary">New Employee</Button>
          {selectedEmployee && ( <EmpModal open={open} handleClose={handleClose} employee={selectedEmployee} />
          )}
          {/* {selectedEmployee && ( <EmpModal open={open} handleClose={handleClose} employee={selectedEmployee} /> )} */}
        </Container>
           
    
    
    </>
      )
  }

export default Employee;