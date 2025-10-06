/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react'
import axios from 'axios'
import Sidenav from "./Sidenav";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';

function TrainingList() {
    const [trainingList, setTrainingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {sopNumber} = useParams();
    const role = localStorage.getItem('role');
    
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

    const handleDelete = async (training) => { 
        const token = localStorage.getItem('token'); 
        const confirmDelete = window.confirm(`Are you sure you want to delete training: ${training.training_name}?`);
        if (!confirmDelete) return;
        
        try {
            const response = await axios.delete(
                'http://localhost:3010/api/training/delete/' + training.training_id,
                {
                    headers: { 
                        Authorization : `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }

            );
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
                
                <TableCell>Training Name</TableCell>
                <TableCell>SOP Number</TableCell>
                <TableCell>SOP Name</TableCell>
                <TableCell>Training Date</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {trainingList.map((training) => (
                <TableRow key={training.training_id} >
                
                <TableCell>{training.training_name}</TableCell>
                <TableCell>{training.sop_number}</TableCell>
                <TableCell>{training.sop_name}</TableCell>
                <TableCell>{formatDateTimeForSQL(training.training_date)}</TableCell>
                <TableCell>
                    <Button variant='contained' color='primary' onClick={() => handleDetails(training)}>Details</Button>
                </TableCell>
                <TableCell>
                    {role !== 'Viewer' && (
                        <>
                        <Button variant='contained' color='secondary' onClick={() => handleDelete(training)}>Delete</Button>
                        </>
                    )}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
           
        </Table>
        <TableCell >
            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                <Button
                  variant="contained"
                  
                  color="primary"
                  onClick={() => window.history.back()}
                >
                  Go Back
              </Button>
              </Box>
        </TableCell>
    </TableContainer>
    </>
  )
}


export default TrainingList;