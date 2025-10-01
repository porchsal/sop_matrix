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
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenPrintDialog(true)}
                        
                    >
                        Print
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.history.back()}
                    >
                    Go Back
                    </Button>
                </Box>
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