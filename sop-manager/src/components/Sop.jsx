/* eslint-disable no-unused-vars */
import Sidenav from './Sidenav';  
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, List, TextField } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";
import SopModal from './SopModal';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Typography from '@mui/material/Typography';
   function Sop() {
    const [sopList, setSopList] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [error, setError] = useState(null);
    const [errorTopics, setErrorTopics] = useState(null);
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");// New state for search
    const [open,setOpen] = useState(false);
    const [currentSop, setCurrentSop] = useState(null);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    
    useEffect(() => {
      const fetchTopics = async () => {
        try {
          const response = await axios.get('http://localhost:3010/api/topics');
          setTopics(response.data);
          setLoadingTopics(false);
        } catch (error) {
          setErrorTopics(error);
        } finally {
          setLoadingTopics(false);
        }
      };
      fetchTopics();
    }, [setErrorTopics, setLoadingTopics]);
    
    useEffect(() => { 
        const fetchData = async () => { 
          try { const response = await axios.get('http://localhost:3010/api/sop'); 
            setSopList(response.data); 
            setLoading(false);
          } catch (error) { 
            setError(error); 
          } finally { 
            setLoading(false); 
          } 
        }; fetchData(); },
        []); 
         if (loading) 
          { return <p>Loading...</p>; } 
         if (error) 
          { return <p>Error loading: {error.message}</p>; }

  const getTopicName = (topicId) => {
    const topic = topics.find((topic) => topic.ID === Number(topicId));
    return topic ? topic.Name : '';
  };
  
  const handleSearchTerm = (event) => {
      setSearchTerm(event.target.value);
      setPage(0);
    }

    const filteredSopList = sopList.filter((sop) => 
      sop.sop_number.toLowerCase().includes(searchTerm) || 
      sop.sop_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sop.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectNew = (training) => {
      if (training) {
        navigate(`/NewTraining`, { state: { training } });
      } else {
        console.error("No SOP selected for new training");
      }
    };

    const handleSelect = (sop) => {
      if (!sop) {
        console.error("SOP object is undefined");
        return;
      }
      const {sop_number} = sop;
      if (sop_number) {
        const encodedSopNumber = sop_number.replace(/\//g, "~");
        navigate(`/training/sopnumber/${encodedSopNumber}`);
      }
      else {
        console.error("No SOP number found for SOP", sop);
      }
    }
    
    const handleEdit = (sop) => {
      if (!sop) {
        console.error("SOP object is undefined");
        return;
      }
     setCurrentSop(sop);
      setOpen(true);
    }

      const handleClose = () => {
      setOpen(false);
      setCurrentSop(null);
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
       count={filteredSopList.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage} />;

    const formatAged = (dateTime) => {  
      const date = new Date(dateTime);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const updatedSopData = (updatedSop, sopId) => {
      try {
        setSopList((prevSopList) => 
          prevSopList.map((prev) => 
            prev.id === sopId ? { ...prev, ...updatedSop } : prev
          )
        );
        if (sopList?.id === sopId) {
          setSopList(updatedSop);
        }
      } catch (error) {
        console.error("Error updating SOP data", error);

      }
    };  

    return (
      <div>
       <Sidenav /> 
        <Box sx={{ p: 4 }}>
          {/* Header */}
          <Box display="flex" alignItems="center" mb={3}>
            <LibraryBooksIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              SOP
            </Typography>
          </Box>
        </Box>
       <TextField
        label="Search SOP"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchTerm}
      />      
      <div> 
              <List> 
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 800 }}>
                    <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>SOP Number</TableCell>
                          <TableCell align="center">SOP Name</TableCell>
                          <TableCell align="right">Topic</TableCell>
                          <TableCell align="center">Active</TableCell>
                          <TableCell align="center">Effective Date</TableCell>
                          <TableCell align="center">Aged</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredSopList
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((sopL) => (
                            <TableRow
                              key={sopL.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">{sopL.sop_number}</TableCell>
                              <TableCell align="center">{sopL.sop_name}</TableCell>
                              <TableCell align="right">{getTopicName(sopL.topic)}</TableCell>
                              <TableCell align="center">{sopL.active}</TableCell>
                              <TableCell align="center">{formatDateTimeForSQL(sopL.effective_date)}</TableCell>
                              <TableCell 
                                align="center" 
                                sx={{ 
                                  backgroundColor: () => { 
                                    if (formatAged(sopL.effective_date) > 1096) { 
                                      return 'red'; 
                                      } else if (formatAged(sopL.effective_date) > 730) { 
                                        return 'yellow'; 
                                        } else { 
                                          return 'white'; 
                                          } 
                                          } 
                                          }} >
                                {formatAged(sopL.effective_date)}
                              </TableCell>
                            <TableRow>  
                            <TableCell align="center">
                              <Button 
                                onClick={() => handleSelect(sopL)}
                                >
                                  Select Trainings
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                              {role !== 'Viewer' && (
                                <>
                                <Button 
                                  align="right" 
                                  onClick={() => handleSelectNew(sopL)} 
                                >
                                  New Training
                                  </Button>
                                  </>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {role !== 'Viewer' && (
                                <>
                                  
                                <Button 
                                  align="right" 
                                  onClick={() => handleEdit(sopL)} 
                                >
                                  Edit
                                  </Button>
                                  </>
                              )}
                            </TableCell>
                            </TableRow>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>  
                  </TableContainer>
                  {tablePaginationComponent}
|                </Paper>
                  {role !== 'Viewer' && (
                    
                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 2 }} >  
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={()=>{navigate("/sop/newsop")}} 
                      >New SOP
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.history.back()}
                    >
                      Go Back
                    </Button>
                  </Box>
                    
                  )}
              </List>
              <SopModal 
                open={Boolean(currentSop)} 
                handleClose={handleClose} 
                currentSop={currentSop} 

                updatedSopData={updatedSopData}
              />
        </div>
      </div>
    )
  }
    
export default Sop
    