/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Box, Typography, Button,Select, MenuItem, Paper, } from '@mui/material';
import Sidenav from "./Sidenav";
import { Form, useNavigate } from "react-router-dom";
import DatePickerComponent from './DatePickerComponent';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Grid, Card, CardContent, Divider } from '@mui/material';

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
    const [positions, setPositions] = useState([]);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    const [selectedSites, setSelectedSites] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [departmentRes, siteRes, positionRes, topicRes] = await Promise.all([
                    axios.get('http://localhost:3010/api/department'),
                    axios.get('http://localhost:3010/api/sites'),
                    axios.get('http://localhost:3010/api/position'),
                    axios.get('http://localhost:3010/api/topics'),
                ]);
                setDepartments(departmentRes.data);
                setSites(siteRes.data);
                setPositions(positionRes.data);
                setTopics(topicRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        }, []);

        console.log("fetched positions:", positions);
        console.log("fetched departments:", departments);
        console.log("fetched sites:", sites);
        console.log("fetched topics:", topics);
        const addSop = async (newSop) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3010/api/sop/newsop', 
                newSop,
                {
                    headers: {
                        Authorization : `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            
            );

            console.log('SOP added successfully:', response.data);
            navigate('/sop');
        } catch (error) {
            
            console.error('Error adding SOP:', error);
        }
    }

    useEffect(() => {
        if( selectedDepartment.length > 0) {
            const filtered = positions.filter(position =>{
                return selectedDepartment.includes(position.department_id);
                }
            );
            setFilteredPositions(filtered);
        } else {
            setFilteredPositions([])
        }
    }, [selectedDepartment, positions]);


    const handleSiteChange = (event) => {
        const siteId = Number(event.target.value);
        setSelectedSites((prev) =>
            event.target.checked ? [...new Set([...prev, siteId])] : prev.filter((id) => id !== siteId)
        );
    };

    const handleDepartmentChange = (event) => { 
        const departmentId = Number(event.target.value); 
        setSelectedDepartment((prev) => 
            event.target.checked ? [... new Set([...prev, departmentId])] : prev.filter(id => id !== departmentId) 
        ); 
    };
    
    const handlePositionChange = (event) => {
        const positionId = Number(event.target.value);
        setSelectedPosition((prev) =>
            event.target.checked ? [... new Set([...prev, positionId])] : prev.filter(id => id !== positionId)
        );
    };

    const handleSaveSop = async () => {
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
    }

return (
    <>
    <Sidenav />
        
            <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: "auto",
        borderRadius: 3,
        mt: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add New SOP
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* SOP Number and Title */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="SOP Number"
            value={sopNumber}
            onChange={(e) => setSopNumber(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="SOP Title"
            value={sopTittle}
            onChange={(e) => setSopTittle(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Effective Date and Link */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" mb={1}>
            Effective Date
          </Typography>
          <Box
            sx={{
              "& .MuiInputBase-root": { fontSize: "1rem" },
              "& .MuiInputLabel-root": { fontSize: "1rem" },
            }}
          >
            <DatePickerComponent
              date={sopEffectiveDate}
              setDate={setSopEffectiveDate}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="SOP Link"
            value={sopLink}
            onChange={(e) => setSopLink(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Comment */}
        <Grid item xs={12}>
          <TextField
            label="SOP Comment"
            value={sopComment}
            onChange={(e) => setSopComment(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
        </Grid>

        {/* Status and Topic */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle2" mb={1}>
              Status
            </Typography>
            <Select
              value={sopStatus}
              onChange={(e) => setSopStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Yes">Active</MenuItem>
              <MenuItem value="No">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle2" mb={1}>
              Topic
            </Typography>
            <Select
              value={sopTopic}
              onChange={(e) => setSopTopic(e.target.value)}
              displayEmpty
            >
              {topics.map((topic) => (
                <MenuItem key={topic.ID} value={topic.ID}>
                  {topic.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sites / Departments / Positions */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Applicability
              </Typography>

              <Grid container spacing={3}>
                {/* Sites */}
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">Main Sites</FormLabel>
                    <FormGroup>
                      {sites.map((site) => (
                        <FormControlLabel
                          key={site.ID}
                          control={
                            <Checkbox
                              checked={selectedSites.includes(site.ID)}
                              onChange={handleSiteChange}
                              value={site.ID}
                            />
                          }
                          label={site.Name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>

                {/* Departments */}
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">Departments</FormLabel>
                    <FormGroup>
                      {departments.map((department) => (
                        <FormControlLabel
                          key={department.ID}
                          control={
                            <Checkbox
                              checked={selectedDepartment.includes(department.ID)}
                              onChange={handleDepartmentChange}
                              value={department.ID}
                            />
                          }
                          label={department.Name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>

                {/* Positions */}
                <Grid item xs={12} sm={4}>
                  {selectedDepartment.length > 0 &&
                  filteredPositions.length > 0 ? (
                    <FormControl component="fieldset" variant="standard">
                      <FormLabel component="legend">Positions</FormLabel>
                      <FormGroup>
                        {filteredPositions.map((position) => (
                          <FormControlLabel
                            key={position.ID}
                            control={
                              <Checkbox
                                checked={selectedPosition.includes(position.ID)}
                                onChange={handlePositionChange}
                                value={position.ID}
                              />
                            }
                            label={position.Name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Select a department to view positions.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSop}
                
            //   onClick={() => {
            //     const formattedEffectiveDate =
            //       formatDateTimeForSQL(sopEffectiveDate);
            //     const newSop = {
            //       sop_number: sopNumber,
            //       sop_name: sopTittle,
            //       topic: sopTopic,
            //       effective_date: formattedEffectiveDate,
            //       link: sopLink,
            //       comment: sopComment,
            //       active: sopStatus,
            //     };
            //     addSop(newSop);
            //   }}
                
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => window.history.back()}
              
            >
              Close
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </>
);


};

export default NewSop;



{/* <Box>
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
                            
                            <TableBody>
                                    <Box sx={{ display: 'flex', gap: '24px', justifyContent: 'space-between', mt: 2, mb: 2 }}>
                                        <FormControl component="fieldset">
                                                <FormLabel component="legend">Main Site</FormLabel>
                                                <FormGroup  >
                                                    {sites.map((site) => (
                                                        <FormControlLabel
                                                            key={site.ID}
                                                            control={
                                                                <Checkbox
                                                                    checked={selectedSites.includes(site.ID)}
                                                                    onChange={handleSiteChange}
                                                                    value={site.ID}
                                                                    name={site.Name}
                                                                />
                                                                }
                                                                label={site.Name}
                                                            />
                                                        ))}
                                                </FormGroup>
                                            </FormControl>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Departments:</FormLabel>
                                                    <FormGroup >
                                                        {departments.map((department) => (
                                                            <FormControlLabel
                                                                key={department.ID}
                                                                control={
                                                                <Checkbox
                                                                    checked={selectedDepartment.includes(department.ID)}
                                                                    onChange={handleDepartmentChange}
                                                                    value={department.ID}
                                                                    name={department.Name}
                                                                    />
                                                                }
                                                                label={department.Name}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                            </FormControl>
                                            {selectedDepartment.length > 0 && filteredPositions.length > 0 ? ( 
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Position</FormLabel>
                                                <FormGroup>
                                                    {filteredPositions.map((position) => (
                                                        <FormControlLabel
                                                            key={position.ID}
                                                            control={
                                                                <Checkbox
                                                                    checked={selectedPosition.includes(position.ID)}
                                                                    onChange={handlePositionChange}
                                                                    value={position.ID}
                                                                    name={position.Name}
                                                                />
                                                                }
                                                            label={position.Name}
                                                            />
                                                        ))}
                                                </FormGroup>
                                            </FormControl>
                                            ) : (
                                                <Box>
                                                    <Typography variant="body1">Please select a department to view positions</Typography>
                                                </Box>
                                            )}
                                            
                                    </Box>
                            </TableBody>
                      
                        
                            
                    </TableBody>
                    
                    <TableContainer
                    display="flex"
                    justifyContent="space-between"
                    fullWidth 
                    component={Paper}>    
                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
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
                        </Box>
                    </TableContainer>
                </Table>
            </Box> */}