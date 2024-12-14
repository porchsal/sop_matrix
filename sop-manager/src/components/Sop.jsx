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

   function Sop() {
    const [sopList, setSopList] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    useEffect(() => { 
        const fetchData = async () => { 
          try { const response = await axios.get('http://localhost:3010/api/sop'); 
            setSopList(response.data); 
            setLoading(false);
          } catch (error) { 
            setError(error); 
            setLoading(false); 
          } 
        }; fetchData(); },
        []); 
         if (loading) 
          { return <p>Loading...</p>; } 
         if (error) 
          { return <p>Error loading: {error.message}</p>; }
    
    const handleSelect = (sop) => {
      console.log("SOP Selected", sop);
    }
    
    const handleNew = () => {
      console.log("New SOP");
    }
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
    }
     const tablePaginationComponent = <TablePagination
       rowsPerPageOptions={[5, 10, 25]}
       component="div"
       count={sopList.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage} />;
    return (
      <div>
       <Sidenav /> 
      <h1>SOP</h1>
       <div> <h2>List of SOP</h2> 
              <List> 
              
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>SOP Number</TableCell>
                          <TableCell align="center">SOP Title</TableCell>
                          <TableCell align="right">Topic</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sopList.map((sopL) => (
                        <TableRow
                            key={sopL.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover onClick={() => handleSelect(sopL)}
                          >
                            <TableCell component="th" scope="row">{sopL.sop_number}</TableCell>
                            <TableCell align="center">{sopL.sop_title}</TableCell>
                            <TableCell align="right">{sopL.topic}</TableCell>
    {/* <TableCell align="right">{sopL.effective_date}</TableCell> */}

                            <Button onClick={() => handleSelect(sopL)}>Select Trainings</Button>
                          <Button align="right" onClick={handleNew}>New Training</Button>
                          </TableRow>
                          
                          
                        
                        ))}
                      </TableBody>
                    </Table>  
                  </TableContainer>
                  {tablePaginationComponent}
                  
                </Paper>
                
                
              </List>
        </div>
      </div>
    )
  }
    
    export default Sop;