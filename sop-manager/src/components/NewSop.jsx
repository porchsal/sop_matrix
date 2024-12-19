import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem } from '@mui/material';
import { Paper, FormGroup, FormLabel, FormControlLabel, FormControl, Checkbox } from '@mui/material';
import Sidenav from "./sidenav";
import { useNavigate } from "react-router-dom";

const NewSop = () => {
    const [sopNumber, setSopNumber] = useState();
    const [sopTittle, setSopTittle] = useState();
    const [sopTopic, setSopTopic] = useState();
    const [sopEffectiveDate, setSopEffectiveDate] = useState();
    const [sopLink, setSopLink] = useState();
    const [sopComment, setSopComment] = useState();
    const [sopStatus, setSopStatus] = useState();
    const [positionId, setPositionId] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [siteId, setSiteId] = useState();
    const [topicId, setTopicId] = useState();
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3010/api/position');
                setPositions(response.data);
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

    const handleSiteChange = (e) => {
        setSiteId(e.target.value);
    };

    const formatDateTimeForSQL = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 10);
    };

    const addSop = async (newSop) => {
        try {
            const response = await axios.post('http://localhost:3010/api/sop', newSop);
            console.log('New SOP:', response.data);
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
                            <TableCell>
                                <TextField
                                        label="SOP Effective Date"
                                        value={sopEffectiveDate}
                                        onChange={(e) => setSopEffectiveDate(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
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
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </TableCell>
                               
                            
                        </TableRow>

                        <TableRow>
                            <TableCell>Topic</TableCell>
                            
                            <TableCell>
                                <Select
                                    onChange={(e) => setTopicId(e.target.value)}
                                    variant="standard"
                                    required
                                    >
                                    {topics.map((topic) => (
                                        <MenuItem key={topic.id} value={topic.id}>{topic.topic_name}</MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Main Site</FormLabel>
                                        <FormGroup  >
                                            
                                                
                                                {sites.map((site) => (
                                                    <FormControlLabel
                                                        key={site.id}
                                                        control={
                                                            <Checkbox
                                                                checked={siteId}
                                                                onChange={handleSiteChange}
                                                                name={site.site_name}
                                                            />
                                                        }
                                                        label={site.site_name}
                                                    />
                                                ))}
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Department</FormLabel>
                                        <FormGroup>
                                            {departments.map((department) => (
                                                <FormControlLabel
                                                    key={department.id}
                                                    control={
                                                        <Checkbox
                                                            checked={departmentId}
                                                            onChange={(e) => setDepartmentId(e.target.value)}
                                                            name={department.dep_name}
                                                        />
                                                    }
                                                    label={department.dep_name}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                </TableCell>

                        </TableRow>
                    </TableBody>
                    <TableContainer component={Paper}>    
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={async () => {
                                const formattedEffectiveDate = formatDateTimeForSQL(sopEffectiveDate);
                                const newSop = {
                                    sop_number: sopNumber,
                                    sop_tittle: sopTittle,
                                    sop_topic: sopTopic,
                                    sop_effective_date: formattedEffectiveDate,
                                    sop_link: sopLink,
                                    sop_comment: sopComment,
                                    sop_status: sopStatus,
                                };
                                addSop(newSop);
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="contained" sx={{ mt: 2 }} >Close</Button>
                    </TableContainer>
                </Table>
            </Box>
            

            
    
    </>
);







};

export default NewSop