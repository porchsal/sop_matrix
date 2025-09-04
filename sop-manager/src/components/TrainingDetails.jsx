import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import axios from "axios";
import Sidenav from "./Sidenav";
import { useLocation } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PrintTraining from "../helpers/PrintTraining";
import formatDateTimeForSQL from "../helpers/formatDateTimeForSQL";

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

    // const formatDateTimeForSQL = (dateTime) => {
    //     const date = new Date(dateTime);
    //     return date.toISOString().slice(0, 10);
    // };

    // const handlePrint = () => {
    //     const printWindow = window.open("", "_blank");
    //     const logoUrl = "http://localhost:5173/logo.png";
    //     const img = new Image();
    //     img.src = logoUrl;
    //     img.onload = () => {
    //     printWindow.document.write(`
    //   <html>
    //     <head>
    //         <meta charset="utf-8">
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th style="text-align: center; vertical-align: middle; padding: 0; margin: 0;">
    //                         <img src="/logo.png" alt="Logo" style="width: 140px; display: block; margin: 10px auto; padding: 0; ">
    //                     </th>
    //                     <th style="width: 40%; text-align: center; font-size: 12px; line-height: 1.2; ">
    //                         Group Training Session Attendance Sheet
    //                     </th>
    //                     <th style="
    //                         width: 40%; 
    //                         text-align: right; 
    //                         vertical-align: top; 
    //                         font-size: 12px; 
    //                         line-height: 1.2; ; 
    //                         white-space: pre-wrap;"
    //                         min-height: calc(5 * 1.2em);
    //                         height: calc(5 * 1.2em);
    //                         display: inline-block;"
    //                         >
    //                         ${training.version}
    //                     </th>
    //                 </tr>
    //             </thead>

    //                 <title>Training Details</title>
    //                     <style>
    //                         body {
    //                             font-family: Arial, sans-serif;
    //                             margin: 20px;
    //                         }
    //                         h1 {
    //                             color: #333;
    //                             text-align: center;
    //                         }
    //                         table {
    //                             width: 100%;
    //                             border-collapse: collapse;
    //                             margin-top: 20px;
    //                         }
    //                         th, td {
    //                             border: 1px solid #ddd;
    //                             padding: 8px;
    //                             text-align: left;
    //                         }
    //                         th {
    //                             background-color: #f4f4f4;
    //                             font-weight: bold;
    //                         }
    //                         tr:nth-child(even) {
    //                             background-color: #f9f9f9;
    //                         }
    //                         img {
    //                             width: 150px;
    //                             height: auto;
    //                             margin: 20px auto;
    //                             display: block;
    //                         }
    //                         footer {
    //                             margin-top: 20px;
    //                             font-size: 0.8em;
    //                             text-align: justify;
    //                         }

    //                         /* Reglas para impresión */
    //                         @media print {
    //                             table {
    //                                 page-break-inside: auto;
    //                             }
    //                             tr {
    //                                 page-break-inside: avoid;
    //                                 page-break-after: auto;
    //                             }
    //                             thead {
    //                                 display: table-header-group;
    //                             }
    //                             tfoot {
    //                                 display: table-footer-group;
    //                             }
    //                             img {
    //                                 page-break-inside: avoid;
    //                             }
    //                         }
    //                     </style>
    //     </head>
    //     <body>
    //       <table>
    //         <thead>
    //             <tr>
    //                 <th> Date of Training Session</th>
    //                 <td>${formatDateTimeForSQL(training.training_date)}</td>
    //             </tr>
    //             <tr>
    //                 <th> Area(s) of Training / SOP Number</th>
    //                 <td>${training.sop_number}</td>
    //             </tr>
    //             <tr>
    //                 <th> Training Session Name / SOP Title</th>
    //                 <td>${training.sop_name}</td>
    //             </tr>
    //             <tr>
    //                 <th> Qualified Trainer Name</th>
    //                 <td>${trainer}</td>
    //             </tr>
    //             <tr>
    //                 <th>Type of Training:</th>
    //                 <td>${training.type_training}</td>
    //             </tr>
    //             <tr>
    //                 <th>Change Control or Deviation Report Number:</th>
    //                 <td>${training.control}</td>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             <tr>
    //                 <th colspan="2" style="text-align: center; font-weight: bold; width: 100%;">
    //                     Description of training
    //                 </th>
    //             </tr>
    //            <tr>
    //                 <td colspan="2" style="border: 1px solid black; height: 300px; white-space: pre-wrap; vertical-align: top; ">${training.description}</td>
    //             </tr>
    //             <tr>
    //             <th>Training Assessment Required?:</th>
    //             <th>
    //                 <label>
    //                     <input 
    //                     type="checkbox" 
    //                     ${training.assessment === 'Yes' ? 'checked' : ''}
    //                     readonly
    //                     />
    //                     Yes
    //                 </label>
    //                 <label>
    //                     <input 
    //                     type="checkbox" 
    //                     ${training.assessment === 'No' ? 'checked' : ''}
    //                     readonly
    //                     />
    //                     No
    //                 </label>
    //             </th>
    //             </tr>
    //             <th style="width: 35%; " >Comments:</th>
    //             <td style="height: 100px; white-space: pre-wrap; vertical-align: top; width: 65%; ">${training.comments}</td>
    //         </tbody>
    //     </table>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Employee Name Print</th>
    //             <th>Employee Signature</th>
    //           </tr>
    //         </thead>
    //             <tbody>
    //                 ${empList
    //                     .map(
    //                         (employee) => `
    //                 <tr style="page-break-inside: avoid;">
    //                     <td width="50%">${employee.name}</td>
    //                     <td width="50%"></td>
    //                 </tr>
    //                 `
    //                     )
    //                     .join("")}
    //             </tbody>
    //       </table>
    //     </body>
    //     <footer>
    //               <p>The employee’s signature certifies that the employee has either read the SOP listed or
    //                 provided verbal training on the SOP listed and/or hands on training on the SOP listed and
    //                 understands the materials and techniques required to perform the procedure. The employee
    //                 addressed any questions to the area supervisor, or the qualified trainer and all issues were
    //                 clearly understood.</p>
    //   </html>
    //     `);
    //         printWindow.document.close();
    //         printWindow.onload = () => {
    //             printWindow.print();
    //         };
    //     };
    //     img.onerror = () => {
    //         console.error("Error al cargar la imagen");
    //     };

    // };

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error loading: {error.message}</p>;
    }

    return (
        <>
        <Sidenav />
        <Box 
            sx={{ 
                    marginTop: 8,
                    width: '800px',
                    padding: '20px', 
                    border: '1px solid black', 
                    borderRadius: '5px', 
                }}
                >
                <TableHead>
                    <Typography 
                        variant="h3"
                        sx={{ 
                            marginBottom: 2,
                            marginTop: 2,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Training Details
                    </Typography>
                </TableHead>
                <TableRow>
                    <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '40%', backgroundColor: '#f4f4f4' }}
                    >
                        <Typography variant="h6">
                            Date of training session: 
                        </Typography>
                    </TableCell>
                    <TableCell
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '60%' }}
                        >
                            <Typography variant="h6">
                                {(training.training_date) ? formatDateTimeForSQL(training.training_date) : 'N/A'}
                            </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '40%', backgroundColor: '#f4f4f4' }}
                    >
                        <Typography variant="h6" >
                        Area(s) of Training / SOP Number: 
                        </Typography>
                    </TableCell>
                    <TableCell
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '60%' }}
                    >
                        <Typography variant="h6">
                            {training.sop_number}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                <TableCell 
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '60%', backgroundColor: '#f4f4f4' }}
                    >
                        <Typography variant="h6" >
                            Training Session Name / SOP Title:
                        </Typography>
                    </TableCell>
                    <TableCell
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '60%' }}
                        
                    >
                        <Typography variant="h6">
                            {training.sop_name}
                        </Typography>

                    </TableCell>
                    
                </TableRow>
                <TableRow>
                <TableCell
                    component="th" 
                    scope="row" 
                    sx={{ border: '1px solid black', width: '40%', backgroundColor: '#f4f4f4' }}
                >
                        <Typography variant="h6">
                            Qualified Trainer Name: 
                        </Typography>
                    </TableCell>
                    <TableCell
                        component="th" 
                        scope="row" 
                        sx={{ border: '1px solid black', width: '60%' }}
                        
                    >
                        <Typography variant="h6">
                            {trainer}
                        </Typography>
                    </TableCell>
                </TableRow>
            
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Signature</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empList.map((employee) => (
                            <TableRow key={employee.employee_id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell> </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Button to open print dialog */}
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
                    <Typography>SOP Number: {training.sop_number}</Typography>
                    <Typography>SOP Name: {training.sop_name}</Typography>
                    <Typography>Trainer Name: {trainer}</Typography>
                    <Typography>Training Date: {formatDateTimeForSQL(training.training_date)}</Typography>
                    {/* <Typography variant="h6" sx={{ mt: 2 }}>
                        Employees
                    </Typography>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Signature</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empList.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPrintDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            // handlePrint();
                            PrintTraining(training, trainer, empList);
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