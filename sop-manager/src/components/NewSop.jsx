/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem, Paper } from '@mui/material';
import Sidenav from "./Sidenav";
import { useNavigate } from "react-router-dom";
import DatePickerComponent from './DatePickerComponent';

const NewSop = () => {
    const [sopNumber, setSopNumber] = useState();
    const [sopTittle, setSopTittle] = useState();
    const [sopTopic, setSopTopic] = useState();
    const [sopEffectiveDate, setSopEffectiveDate] = useState();
    const [sopLink, setSopLink] = useState();
    const [sopComment, setSopComment] = useState();
    const [sopStatus, setSopStatus] = useState();
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await axios.get('http://localhost:3010/api/department');
                setDepartments(response2.data);
                const response3 = await axios.get('http://localhost:3010/api/sites');
                setSites(response3.data);
                const response4 = await axios.get('http://localhost:3010/api/topics');
                setTopics(response4.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const formatDateTimeForSQL = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 10);
    };

    const addSop = async (newSop) => {
        try {
            const response = await axios.post('http://localhost:3010/api/sop/newsop', newSop);
            console.log('New response:', response.data);
            navigate('/sop');
        } catch (error) {
            console.error('Error adding SOP:', error);
        }
    }

return (
    <>
    <Sidenav />
        <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New SOP
            </Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow>  
                            <TableCell>
                                <TextField
                                    label="SOP Number"
                                    value={sopNumber}
                                    onChange={(e) => setSopNumber(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    label="SOP Tittle"
                                    value={sopTittle}
                                    onChange={(e) => setSopTittle(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{ mt: 2,  
                                    width: '50%',   
                                    '& .MuiInputBase-root': { 
                                        fontSize: '1.25rem',  
                                        }, 
                                    '& .MuiInputLabel-root': { 
                                        fontSize: '1.25rem',   
                                        } 
                                    }}
                                >
                                <DatePickerComponent date={sopEffectiveDate} setDate={setSopEffectiveDate} />
                            </TableCell>
                           <TableCell>
                                <TextField
                                        label="SOP Link"
                                        value={sopLink}
                                        onChange={(e) => setSopLink(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                            </TableCell>
                         </TableRow>                     
                        <TableRow>
                            <TableCell>
                            <TextField
                                    label="SOP Comment"
                                    value={sopComment}
                                    onChange={(e) => setSopComment(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>
                            <Select
                                    label="SOP Status"
                                    value={sopStatus}
                                    onChange={(e) => setSopStatus(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    >
                                <MenuItem value="Yes">Active</MenuItem>
                                <MenuItem value="No">Inactive</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Topic</TableCell>
                            <TableCell>
                                <Select
                                    onChange={(e) => setSopTopic(e.target.value)}
                                    variant="standard"
                                    required
                                    >
                                    {topics.map((topic) => (
                                        <MenuItem key={topic.ID} value={topic.ID}>{topic.Name}</MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableContainer
                    display="flex"
                    justifyContent="space-between"
                    fullWidth 
                    component={Paper}>    
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={async () => {
                                const formattedEffectiveDate = formatDateTimeForSQL(sopEffectiveDate);
                                const newSop = {
                                    sop_number: sopNumber,
                                    sop_name: sopTittle,
                                    topic: sopTopic,
                                    effective_date: formattedEffectiveDate,
                                    link: sopLink,
                                    comment: sopComment,
                                    active: sopStatus,
                                };
                                addSop(newSop);
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate(-1)} >Close</Button>
                    </TableContainer>
                </Table>
            </Box>
    </>
);


};

export default NewSop;