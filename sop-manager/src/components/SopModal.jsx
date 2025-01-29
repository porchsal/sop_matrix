/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { Modal, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 7,
};


// eslint-disable-next-line react/prop-types
 const SopModal = ({ open, handleClose, currentSop, updatedSopData }) => {
    const [sop_number, setSop_number] = useState([]);
    const [sop_name, setSop_name] = useState([]);
    const [sopTopic, setSopTopic] = useState([]);
    const [topics, setTopics] = useState([]);
    const [active, setActive] = useState([]);
    const [effective_date, setEffective_date] = useState([]);
    const [link, setLink] = useState([]);
    const [sopComment, setSopComment] = useState([]);

    // const formatDateTimeForSQL = (dateTime) => {
    //     const date = new Date(dateTime);
    //     return date.toISOString().slice(0, 10);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3010/api/topics');
                setTopics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    

useEffect(() => {
    if (currentSop) {
      setSop_number(currentSop.sop_number || '');
      setSop_name(currentSop.sop_name || '');
      setSopTopic(currentSop.topic || '');
      setActive(currentSop.active || false);
      setEffective_date(currentSop.effective_date || '');
      setLink(currentSop.link || '');
      setSopComment(currentSop.comment || '');
    }
  }, [currentSop]);

    const handleSave = async () => {
        const updatedSop = {
            sop_number,
            sop_name,
            topic: sopTopic,
            active,
            effective_date: formatDateTimeForSQL(effective_date),
            link,
            comment: sopComment,
        };
        try {
            const response = await axios.put(`http://localhost:3010/api/sop/${currentSop.id}`, updatedSop);
            updatedSopData(updatedSop, currentSop.id);
            handleClose();
            console.log('SOP updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating SOP:', error);
        }
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit SOP
                </Typography>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    label="SOP Number"
                                     value={sop_number}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    label="SOP Name"
                                    value={sop_name}
                                    onChange={(e) => setSop_name(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel id="active-select-label">Active</InputLabel>
                                    <Select
                                        variant='outlined'
                                        label="Active"
                                        value={active}
                                        onChange={(e) => setActive(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
                            </FormControl>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    label="Effective Date"
                                    value={effective_date}
                                    onChange={(e) => setEffective_date(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl>
                                    <InputLabel id="topic-select-label">Topic</InputLabel>

                                        <Select
                                            label="Topic"
                                            value={sopTopic}
                                            onChange={(e) => setSopTopic(e.target.value)}
                                            fullWidth
                                        >
                                        {topics.map((topic) => (
                                            <MenuItem 
                                                key={topic.ID} 
                                                value={topic.ID}>
                                                {topic.Name}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                </FormControl>
                            </TableCell>
                            
                            <TableCell>
                                <TextField
                                    label="Link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    label="Comment"
                                    value={sopComment}
                                    onChange={(e) => setSopComment(e.target.value)}
                                />
                            </TableCell>

                        </TableRow>

                    </TableBody>
                </TableContainer>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2
                    }}
                >
                    Save
                </Button>
                <Button 
                    onClick={handleClose}
                    variant="contained" 
                    color="secondary" 
                    sx={{ mt: 2 }} 
                >
                Close
                </Button>
            </Box>
        </Modal>
    );


 }

export default SopModal;