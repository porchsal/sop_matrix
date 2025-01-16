import Sidenav from "./Sidenav";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableFooter } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Training() {

  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNewTraining = (training) => {
    navigate('/NewTraining', {state: {training}});
  }

  const handleSelect = (training) => {
    if (!training) {
      console.error("Training object is undefined");
      return;
    }
    const {sop_number} = training;
    if (sop_number) {
      //const encodedSopNumber = encodeURIComponent(sop_number);
      const encodedSopNumber = sop_number.replace(/\//g, "~");
      navigate(`/training/sopnumber/${encodedSopNumber}`);
    } else {
      console.error("No SOP number found for training", training);
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/training');
        setTrainingList(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData(); }, 
    []);
    if (loading) {
      return <p>Loading...</p>;
    } else if (error) { 
      return <p>Error loading: {error.message}</p>;
    }

  return (
    <>
    <Sidenav />
    
    <h1>Training List</h1>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Training ID</TableCell>
            <TableCell>Training Name</TableCell>
            <TableCell>SOP Number</TableCell>
            <TableCell>SOP Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainingList.map((training) => (
            <TableRow key={training.id}>
              <TableCell>{training.training_id}</TableCell>
              <TableCell>{training.training_name}</TableCell>
              <TableCell>{training.sop_number}</TableCell>
              <TableCell>{training.sop_name}</TableCell>
              <TableCell><Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  handleSelect(training)
                  console.log(training  )
                  }
                  }
                  >
                    List</Button></TableCell>
              <TableCell><Button onClick={ ()=>{
                handleNewTraining(training)
                }
              } 
              >
                New Training</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  )
}

export default Training;