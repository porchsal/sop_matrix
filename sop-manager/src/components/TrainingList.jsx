import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react'
import axios from 'axios'
import Sidenav from "./Sidenav";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function TrainingList() {
    const [trainingList, setTrainingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {sopNumber} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const decodedSopNumber = decodeURIComponent(sopNumber);
                
                const response = await axios.get(`http://localhost:3010/api/training/sopnumber/${decodedSopNumber}`);
                setTrainingList(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [sopNumber]);

    const handleDetails = (training) => {
        if (!training) {
            console.error("Training object is undefined");
            return;
        }
        navigate(`/training/details/${training.training_id}`, {state: {training}});
    }

    const formatDateTimeForSQL = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 10);
      };

    const handleDelete = async (training) => {  
        try {
            const response = await axios.delete('http://localhost:3010/api/training/delete/' + training.training_id);
            console.log(response);
            const updatedTrainingList = trainingList.filter((t) => t.training_id !== training.training_id);
            setTrainingList(updatedTrainingList);
            
        } catch (error) {
            console.error('Error deleting training:', error);
        }
    }


  return (
    <>
    <Sidenav />
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Training ID</TableCell>
                <TableCell>Training Name</TableCell>
                <TableCell>SOP Number</TableCell>
                <TableCell>SOP Name</TableCell>
                <TableCell>Trainer Name</TableCell>
                <TableCell>Training Date</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {trainingList.map((training) => (
                <TableRow key={training.training_id} >
                <TableCell>{training.training_id}</TableCell>
                <TableCell>{training.training_name}</TableCell>
                <TableCell>{training.sop_number}</TableCell>
                <TableCell>{training.sop_name}</TableCell>
                <TableCell>{training.trainer_name}</TableCell>
                <TableCell>{formatDateTimeForSQL(training.training_date)}</TableCell>
                <TableCell>
                    <Button variant='contained' color='primary' onClick={() => handleDetails(training)}>Details</Button>
                </TableCell>
                <TableCell>
                    <Button variant='contained' color='secondary' onClick={() => handleDelete(training)}>Delete</Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  )
}


export default TrainingList;