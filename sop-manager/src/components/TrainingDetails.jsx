import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import axios from "axios";
import Sidenav from "./Sidenav";
import { useLocation } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import logo from '../assets/logo.png';
function TrainingDetails() {
    const [empList, setempList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openPrintDialog, setOpenPrintDialog] = useState(false);
    const location = useLocation();
    const training = location.state?.training;
    const [trainerName, setTrainerName] = useState(null);
    const [trainer, setTrainer] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const training_id = training.training_id;
            try {
                const response = await axios.get(`http://localhost:3010/api/training/details/${training_id}`);
                setempList(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [training.training_id]);

    useEffect(() => {
        const fetchDataTrainer = async () => {
            if (!training.trainer_name) {
                console.error("Trainer name is not defined");
                return;
            }
            
            try {
                const response = await axios.get(`http://localhost:3010/api/employee/${training.trainer_name}`);
                setTrainerName(response.data);
                
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }

        };
        fetchDataTrainer();
    }, [training.trainer_name]);

    useEffect(() => {
        if (trainerName) {
        setTrainer(trainerName[0].name);
        }
    }, [trainerName]);

    const formatDateTimeForSQL = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 10);
    };

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
      <html>
        <head>
            <img src=${logo} alt="Logo" style="width: 150px; height: auto; display: block; margin-left: auto; margin-right: auto; margin-top: 20px; margin-bottom: 20px;">
          <title>Training Details</title>
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
        </head>
        <body>
          <p><strong>ID:</strong> ${training.training_id}</p>
          <p><strong>SOP Number:</strong> ${training.sop_number}</p>
          <p><strong>SOP Name:</strong> ${training.sop_name}</p>
          <p><strong>Trainer Name:</strong> ${trainer || "N/A"}</p>
          <p><strong>Training Date:</strong> ${formatDateTimeForSQL(training.training_date)}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              ${empList
                  .map(
                      (employee) => `
                <tr>
                  <td width="10%" >${employee.employee_id}</td>
                  <td width="50%">${employee.name}</td>
                  <td width="40%"></td>
                </tr>
              `
                  )
                  .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error loading: {error.message}</p>;
    }

    return (
        <>
            <Sidenav />
            <Box>
            <Typography variant="h4" gutterBottom>
                Training Details
            </Typography>
            <TableRow>
                <TableCell>
                    <Typography variant="h6" >
                        ID: {training.training_id}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="h6" >
                        SOP Number: {training.sop_number}
                    </Typography>
                </TableCell>
                
            </TableRow>
            <TableRow>
            <TableCell>
                    <Typography variant="h6" >
                        SOP Name: {training.sop_name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="h6">
                        Trainer Name: {trainer}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                <Typography variant="h6">
                    Training Date: {(training.training_date) ? formatDateTimeForSQL(training.training_date) : 'N/A'}
                </Typography>
                </TableCell>
            </TableRow>
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell maxWidth={40}>ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Signature</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empList.map((employee) => (
                            <TableRow key={employee.employee_id}>
                                <TableCell>{employee.employee_id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>{/* Botón para abrir el diálogo de impresión */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenPrintDialog(true)}
                    sx={{ marginY: 2 }}
                >
                    Print
                </Button>

            </Box>

        {/* Diálogo de impresión */}
        <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Training Details</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Training Information</Typography>
                    <Typography>ID: {training.training_id}</Typography>
                    <Typography>SOP Number: {training.sop_number}</Typography>
                    <Typography>SOP Name: {training.sop_name}</Typography>
                    <Typography>Trainer Name: {trainer}</Typography>
                    <Typography>Training Date: {formatDateTimeForSQL(training.training_date)}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Employees
                    </Typography>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Signature</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empList.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.employee_id}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPrintDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handlePrint();
                            setOpenPrintDialog(false);
                        }}
                        color="primary"
                    >
                        Confirm and Print
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TrainingDetails;