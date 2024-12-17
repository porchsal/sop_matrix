import Sidenav from "./sidenav";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, List, TableFooter } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";

function Training() {

  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleNewTraining = (sopNumber) => {
    //console.log(sopNumber);
    navigate("/NewTraining");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/training');
        setTrainingList(response.data);
        setLoading(false);
        console.log(response.data);
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
    
    <div>Training</div>

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
              <TableCell><Button variant="contained" color="primary">Details</Button></TableCell>
              <TableCell><Button onClick={()=>handleNewTraining(training.sop_number)}>New Training</Button></TableCell>
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