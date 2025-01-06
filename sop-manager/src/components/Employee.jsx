import React from 'react';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Sidenav from './Sidenav';
import { Container, Box, Typography, Paper,  Button, TablePagination } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EmpModal from './EmpModal';
import NewEmpModal from './NewEmpModal';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';
function Employee() {

  const columnNames = { 
    id: 'ID', 
    name: 'Name', 
    date_of_hire: 'Date of Hire',
    active: 'Active',
    trainer: 'Trainer',
    position_id: 'Position',
    department_id: 'Department', 
    site_id: 'Site',
  };

  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);	
  const [trainByEmployee, setTrainByEmployee] = useState({});
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/training/byEmployee/${employee.id}`);
        setTrainByEmployee(response.data);
        console.log('Training by Employee:', response.data);
      } catch (error) {
        console.error('Error fetching training:', error);
      }
    };
    fetchTrainings();
  };
  
  const handleEditEmployee = (employee) => { 
    setSelectedEmployee(employee); 
    setOpen(true); 
    // console.log('Selected Employee:', employee);
  };
    
  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  }; 

  const handleCloseNew = () => {
    // console.log('Close New Employee');
    setOpenNew(false);

  }; 

  const updatedEmployeeData = (updatedEmployee) => {
      setEmployees((prevEmployees) => 
        prevEmployees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
      );
      setSelectedEmployee(updatedEmployee);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      }  
  const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

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
                      {employees
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((employee) => (
                        <TableRow 
                        key={employee.ID} 
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
                        <TableBody>
                          {console.log('Selected Employee:', selectedEmployee)}
                          {Object.entries(selectedEmployee)
                          .map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell>{columnNames[key] || key}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                            ))}
                            <TableRow>
                              <TableCell>
                                <Button variant="contained" color="primary" onClick={() => 
                                  handleEditEmployee(selectedEmployee)
                                  }>Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                      <Table>
                        <TableHead>
                        <Typography variant="h6" gutterBottom>Trainings</Typography>
                        </TableHead>
                        <TableBody>
                          <TableHead>
                            <TableCell>SOP Name</TableCell>
                            <TableCell>SOP Number</TableCell>
                            <TableCell>Training Date</TableCell>
                          </TableHead>     
                            {Array.isArray(trainByEmployee) && trainByEmployee.length > 0 ? (
                            <TableBody>
                              {trainByEmployee.map((training) => (
                                <TableRow key={training.training_id}>
                                  <TableCell>{training.sop_name}</TableCell>
                                  <TableCell>{training.sop_number}</TableCell>
                                  <TableCell>{formatDateTimeForSQL(training.training_date)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          ) : (
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={2}>No training found</TableCell>
                              </TableRow>
                            </TableBody>
                          )  
                          }


                        </TableBody>
                      </Table>
                    </TableContainer>
                ) : (
                <Typography variant="body1">Select an employee</Typography>
                )}
                
              </Paper>

            </Box>
            <Button variant="contained" color="primary" onClick={() => setOpenNew(true)}>Add Employee</Button>
            {selectedEmployee && (
              <EmpModal open={open} handleClose={handleClose} employee={selectedEmployee} updatedEmployeeData={updatedEmployeeData}/>
            )}
            <NewEmpModal open={openNew} handleClose={handleCloseNew} addEmployee={handleAddEmployee} />
            
          </Container>
    </>
    )
  }

export default Employee