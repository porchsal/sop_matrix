import React from 'react';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Sidenav from './Sidenav';
import { Container, Box, Typography, Paper,  Button, TablePagination } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EmpModal from './EmpModal';
import NewEmpModal from './NewEmpModal';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';
import logo from '../assets/logo.png';

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
  // eslint-disable-next-line no-unused-vars
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sites, setSites] = useState([]);
  const [trainByEmployee, setTrainByEmployee] = useState({});
  const [selectedSites, setSelectedSites] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [selectedTrainings, setSelectedTrainings] = useState([]);

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
  if (selectedSites.length > 0 || selectedDepartment.length > 0) {
    axios
      .get('http://localhost:3010/api/employee/filterbydep', {
        params: {
          site_id: selectedSites,
          department_id: selectedDepartment,
        },
      })
      .then((response) => {
        setFilteredEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching filtered employees:', error);
        setFilteredEmployees([]);
        setError(error);
        setLoading(false);
      });
  } else {
    setFilteredEmployees(employees);
  }
}, [selectedSites, selectedDepartment, employees]);

useEffect(() => { 
  const fetchEmployees = async () => { 
    try { const response = await axios.get('http://localhost:3010/api/employee'); 
      setEmployees(response.data); 
      setLoading(false);
    } catch (error) { 
      setError(error); 
      setLoading(false); 
    } 
  }; fetchEmployees(); 
}, []); 

useEffect(() => {
  setPage(0); // Reset page when filtered employees change
}, [filteredEmployees]);

const getPositionName = (position_id) => {
  const positionId = Number(position_id); 
  const position = positions.find(pos => pos.ID === positionId);
  return position ? position.Name : position_id; 
};

const getDepartmentName = (id) => {
  const departmentId = Number(id); 
  const department = departments.find(dep => dep.ID === departmentId);
  return department ? department.Name : id; 
};

const getSiteName = (id) => {
  const siteId = Number(id); 
  const site = sites.find(s => s.ID === siteId);
  return site ? site.Name : id; 
};

const handleSelectEmployee = (employee) => {
  setSelectedEmployee(employee);
  const fetchTrainings = async () => {
    try {
      const response = await axios.get(`http://localhost:3010/api/training/byEmployee/${employee.id}`);
      setTrainByEmployee(response.data);
    } catch (error) {
      console.error('Error fetching training:', error);
    }
  };
  fetchTrainings();
};

const handleSiteChange = (event) => {
  const siteId = Number(event.target.value);
  setSelectedSites((prev) =>
      event.target.checked 
      ? [...prev, siteId] 
      : prev.filter(id => id !== siteId)
  );
  
};

const handleDepartmentChange = (event) => {
  const departmentId = Number(event.target.value); 
  setSelectedDepartment((prev) => 
      event.target.checked 
        ? [...prev, departmentId] 
        : prev.filter(id => id !== departmentId) 
  ); 
};

const handleEditEmployee = (employee) => { 
    setSelectedEmployee(employee); 
    setOpen(true); 
  };
    
const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  }; 

const handleCloseNew = () => {
  setOpenNew(false);
  }; 

const updatedEmployeeData = (updatedEmployee, employeeId) => {
  try {
    setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
            emp.id === employeeId ? { ...emp, ...updatedEmployee } : emp
        )
    );

   if (selectedEmployee?.id === employeeId) {
        setSelectedEmployee(updatedEmployee);
    }
  } catch (error) {
    console.error('Error updating employee:', error);
  }
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
  
  const tablePaginationComponentTrainings = <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={trainByEmployee.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage} 
    />

  const handleOpenPrintDialog = () => {
    setPrintDialogOpen(true);
    setSelectedTrainings(trainByEmployee);
  };

  const handleClosePrintDialog = () => {
    setPrintDialogOpen(false);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Training List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px; 
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left; 
            }
            th { 
              background-color: #f4f4f4; 
              font-weight: bold; 
            }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
          <img src="${logo}" alt="Logo" style="display: block; margin: 0 auto; width: 100px;" />
        </head>
        <body>
          <h1>Training List</h1>
          <p><strong>Employee:</strong> ${selectedEmployee.name}</p>
          <p><strong>Position:</strong> ${getPositionName(selectedEmployee.position_id)}</p>
          <table>
            <thead>
              <tr>
                <th>SOP Name</th>
                <th>SOP Number</th>
                <th>Training Date</th>
              </tr>
            </thead>
            <tbody>
              ${selectedTrainings.map(training => `
                <tr>
                  <td>${training.sop_name}</td>
                  <td>${training.sop_number}</td>
                  <td>${formatDateTimeForSQL(training.training_date)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  
return (
   <>
      <Sidenav />
      <h1>Employee Management</h1>
        
          <Container>  
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Paper elevation={3} sx={{ flex: 1, marginRight: 2, padding: 2 }} >
                <Typography variant="h6" gutterBottom>Filters</Typography>
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
              </Paper>
              <Paper elevation={3} sx={{ flex: 1, marginRight: 2, padding: 2 }} >
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(filteredEmployees.length > 0 ? filteredEmployees : employees)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((employee) => (
                        <TableRow 
                        key={employee.ID} 
                        hover onClick={() => handleSelectEmployee(employee)}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{getPositionName(employee.position_id)}</TableCell>
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
                          {Object.entries(selectedEmployee)
                          .map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell>{columnNames[key] || key}</TableCell>
                              {/* <TableCell>{value}</TableCell> */}
                              <TableCell>
                              {
                                  key === 'date_of_hire'
                                  ? formatDateTimeForSQL(value) 
                                  : key === 'position_id' 
                                  ? getPositionName(value) 
                                  : key === 'department_id' 
                                  ? getDepartmentName(value) 
                                  : key === 'site_id' 
                                  ? getSiteName(value)
                                  : value 
                              }
                              </TableCell>
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
                              <TableRow>
                                <TableCell>
                                  <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleOpenPrintDialog}
                                    >
                                    Print Trainings
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          ) : (
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={2}>No training found</TableCell>
                              </TableRow>
                            </TableBody>
                          )  
                          }
                        {tablePaginationComponentTrainings}
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
          <Dialog open={printDialogOpen} onClose={handleClosePrintDialog} fullWidth maxWidth="sm">
            <DialogTitle>Training List</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Employee Details</Typography>
              <Typography>Name: {selectedEmployee?.name}</Typography>
              <Typography>Position: {getPositionName(selectedEmployee?.position_id)}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Trainings</Typography>
              <TableHead>
                <TableRow>
                  <TableCell>SOP Name</TableCell>
                  <TableCell>SOP Number</TableCell>
                  <TableCell>Training Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTrainings.map((training, index) => (
                  <TableRow key={index}>
                    <TableCell>{training.sop_name}</TableCell>
                    <TableCell>{training.sop_number}</TableCell>
                    <TableCell>{formatDateTimeForSQL(training.training_date)}</TableCell>
                  </TableRow>
             ))}
              </TableBody>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePrintDialog} color="secondary">Cancel</Button>
              <Button 
                onClick={() => {
                  handlePrint(); 
                  handleClosePrintDialog();
                }} 
                color="primary"
              >
                Confirm and Print
              </Button>
            </DialogActions>
          </Dialog>
    </>
    )
  }

export default Employee