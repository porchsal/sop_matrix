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
import { Typography } from "@mui/material";
import { Button, TableFooter } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';

function Training() {

  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

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
      const encodedSopNumber = sop_number.replace(/\//g, "~");
      navigate(`/training/sopnumber/${encodedSopNumber}`);
    } else {
      console.error("No SOP number found for training", training);
    }
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  
    if (loading) {
      return <p>Loading...</p>;
    } else if (error) { 
      return <p>Error loading: {error.message}</p>;
    }

    const paginatedTrainings = trainingList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    // const tablePaginationComponent = <TablePagination
    //    rowsPerPageOptions={[5, 10, 25]}
    //    component="div"
    //    count={trainingList.length}
    //    rowsPerPage={rowsPerPage}
    //    page={page}
    //    onPageChange={handleChangePage}
    //    onRowsPerPageChange={handleChangeRowsPerPage} />;

  return (
    <>
    <Sidenav />
    <Box 
      sx={{ mt: 8 }}>
        <TableHead >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            Training List
          </Typography>
        </TableHead>
      <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Training Name</TableCell>
              <TableCell>SOP Number</TableCell>
              <TableCell>SOP Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell>{training.training_name}</TableCell>
                <TableCell>{training.sop_number}</TableCell>
                <TableCell>{training.sop_name}</TableCell>
                <TableCell><Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    handleSelect(training)
                    }
                    }
                >
                      List</Button></TableCell>
                <TableCell><Button 
                  onClick={ ()=>{
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
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={trainingList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
            

        </Table>
        {/* {tablePaginationComponent} */}
    </TableContainer>
    
    </Box>
    </>
  )
}

export default Training;