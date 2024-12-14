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
import { Button, List } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';

function Training() {

  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    
    <div>Training</div>
    </>
  )
}

export default Training;