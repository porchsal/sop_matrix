import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";
import axios from "axios";
import Sidenav from "./Sidenav";
import { useLocation } from "react-router-dom";

function TrainingDetails() {
    const [empList, setempList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //const { training_id } = useParams();
    const location = useLocation();
    const training = location.state?.training;
    const [trainerName, setTrainerName] = useState(null);
    const [trainer, setTrainer] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data for training ID:', training.training_id);
            const training_id = training.training_id;
            try {
                const response = await axios.get(`http://localhost:3010/api/training/details/${training_id}`);
                setempList(response.data);
                console.log('Data fetched:', response.data);
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
            console.log('Fetching data for trainer ID:', training.trainer_name);
            // const employee_id = training.trainer_name;
            try {
                const response = await axios.get(`http://localhost:3010/api/employee/${training.trainer_name}`);
                console.log('Data fetched trainer:', response.data);
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
            </TableContainer>

            </Box>
        </>
    );
}

export default TrainingDetails;