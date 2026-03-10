// /* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';

// import { Modal, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem } from '@mui/material';
// import { FormControl, InputLabel } from '@mui/material';
// import axios from 'axios';
// import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 800,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 7,
// };


// // eslint-disable-next-line react/prop-types
//  const SopModal = ({ open, handleClose, currentSop, updatedSopData }) => {
//     const [sop_number, setSop_number] = useState([]);
//     const [sop_name, setSop_name] = useState([]);
//     const [sopTopic, setSopTopic] = useState([]);
//     const [topics, setTopics] = useState([]);
//     const [active, setActive] = useState([]);
//     const [effective_date, setEffective_date] = useState([]);
//     const [link, setLink] = useState([]);
//     const [sopComment, setSopComment] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3010/api/topics');
//                 setTopics(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);
    

// useEffect(() => {
//     if (currentSop) {
//       setSop_number(currentSop.sop_number || '');
//       setSop_name(currentSop.sop_name || '');
//       setSopTopic(currentSop.topic || '');
//       setActive(currentSop.active || false);
//       setEffective_date(currentSop.effective_date || '');
//       setLink(currentSop.link || '');
//       setSopComment(currentSop.comment || '');
//     }
//   }, [currentSop]);

//     const handleSave = async () => {
//         const updatedSop = {
//             sop_number,
//             sop_name,
//             topic: sopTopic,
//             active,
//             effective_date: formatDateTimeForSQL(effective_date),
//             link,
//             comment: sopComment,
//         };
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(
//                 `http://localhost:3010/api/sop/${currentSop.id}`,
//                  updatedSop,
//                 {
//                     headers: {
//                         Authorization : `Bearer ${token}`,
//                         "Content-Type": "application/json"
//                     } 
//                 }
//                 );

//             console.log('Response:', response);
//             updatedSopData(updatedSop, currentSop.id);
//             handleClose();
//         } catch (error) {
//             console.error('Error updating SOP:', error);
//         }
//     }


//     return (
//         <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={style}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                     Edit SOP
//                 </Typography>
//                 <TableContainer>
//                     <TableBody>
//                         <TableRow>
//                             <TableCell>
//                                 <TextField
//                                     label="SOP Number"
//                                      value={sop_number}
//                                 />
//                             </TableCell>
//                             <TableCell>
//                                 <TextField
//                                     label="SOP Name"
//                                     value={sop_name}
//                                     onChange={(e) => setSop_name(e.target.value)}
//                                 />
//                             </TableCell>
//                         </TableRow>
//                         <TableRow>
//                             <TableCell>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="active-select-label">Active</InputLabel>
//                                     <Select
//                                         variant='outlined'
//                                         label="Active"
//                                         value={active}
//                                         onChange={(e) => setActive(e.target.value)}
//                                         fullWidth
//                                     >
//                                         <MenuItem value="Yes">Yes</MenuItem>
//                                         <MenuItem value="No">No</MenuItem>
//                                     </Select>
//                             </FormControl>
//                             </TableCell>
//                             <TableCell>
//                                 <TextField
//                                     label="Effective Date"
//                                     value={effective_date}
//                                     onChange={(e) => setEffective_date(e.target.value)}
//                                 />
//                             </TableCell>
//                         </TableRow>
//                         <TableRow>
//                             <TableCell>
//                                 <FormControl>
//                                     <InputLabel id="topic-select-label">Topic</InputLabel>

//                                         <Select
//                                             label="Topic"
//                                             value={sopTopic}
//                                             onChange={(e) => setSopTopic(e.target.value)}
//                                             fullWidth
//                                         >
//                                         {topics.map((topic) => (
//                                             <MenuItem 
//                                                 key={topic.ID} 
//                                                 value={topic.ID}>
//                                                 {topic.Name}
//                                             </MenuItem>
//                                         ))}
//                                         </Select>
//                                 </FormControl>
//                             </TableCell>
                            
//                             <TableCell>
//                                 <TextField
//                                     label="Link"
//                                     value={link}
//                                     onChange={(e) => setLink(e.target.value)}
//                                 />
//                             </TableCell>
//                         </TableRow>
//                         <TableRow>
//                             <TableCell>
//                                 <TextField
//                                     fullWidth
//                                     label="Comment"
//                                     value={sopComment}
//                                     onChange={(e) => setSopComment(e.target.value)}
//                                 />
//                             </TableCell>

//                         </TableRow>

//                     </TableBody>
//                 </TableContainer>
//                     <TableCell
//                         sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, mt: 2  }}
//                     >
//                         <Button
//                             onClick={handleSave}
//                             variant="contained"
//                             color="primary"
//                             sx={{ mt: 2
//                             }}
//                         >
//                             Save
//                         </Button>
//                         <Button 
//                             onClick={handleClose}
//                             variant="contained" 
//                             color="secondary" 
//                             sx={{ mt: 2 }} 
//                         >
//                         Close
//                         </Button>
//                     </TableCell>
//             </Box>
//         </Modal>
//     );


//  }

// export default SopModal;

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  Modal,
  TextField,
  Box,
  Typography,
  Button,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel
} from '@mui/material';
import axios from 'axios';
import formatDateTimeForSQL from '../helpers/formatDateTimeForSQL';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SopModal = ({ open, handleClose, currentSop, updatedSopData }) => {
  const [sop_number, setSop_number] = useState('');
  const [sop_name, setSop_name] = useState('');
  const [sopTopic, setSopTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [active, setActive] = useState('');
  const [effective_date, setEffective_date] = useState('');
  const [link, setLink] = useState('');
  const [sopComment, setSopComment] = useState('');

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [topicsRes, departmentsRes, positionsRes] = await Promise.all([
          axios.get('http://localhost:3010/api/topics'),
          axios.get('http://localhost:3010/api/department'),
          axios.get('http://localhost:3010/api/position'),
        ]);

        setTopics(topicsRes.data);
        setDepartments(departmentsRes.data);
        setPositions(positionsRes.data);

        if (currentSop?.id) {
          const sopPositionsRes = await axios.get(
            `http://localhost:3010/api/sop/${currentSop.id}/positions`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const sopPositions = sopPositionsRes.data || [];
          const positionIds = sopPositions.map((p) => Number(p.position_id));
          const departmentIds = [
            ...new Set(sopPositions.map((p) => Number(p.department_id))),
          ];

          setSelectedPositions(positionIds);
          setSelectedDepartments(departmentIds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, currentSop]);

  useEffect(() => {
    if (currentSop) {
      setSop_number(currentSop.sop_number || '');
      setSop_name(currentSop.sop_name || '');
      setSopTopic(currentSop.topic || '');
      setActive(currentSop.active || '');
      setEffective_date(currentSop.effective_date || '');
      setLink(currentSop.link || '');
      setSopComment(currentSop.comment || '');
    }
  }, [currentSop]);

  useEffect(() => {
    if (selectedDepartments.length > 0) {
      const filtered = positions.filter((position) =>
        selectedDepartments.includes(Number(position.department_id ?? position.Department_ID))
      );
      setFilteredPositions(filtered);

      setSelectedPositions((prev) =>
        prev.filter((selectedId) =>
          filtered.some((position) => Number(position.ID) === Number(selectedId))
        )
      );
    } else {
      setFilteredPositions([]);
      setSelectedPositions([]);
    }
  }, [selectedDepartments, positions]);

  const handleDepartmentToggle = (departmentId) => {
    const depId = Number(departmentId);

    if (selectedDepartments.includes(depId)) {
      setSelectedDepartments(selectedDepartments.filter((id) => id !== depId));
    } else {
      setSelectedDepartments([...selectedDepartments, depId]);
    }
  };

  const handlePositionToggle = (positionId) => {
    const posId = Number(positionId);

    if (selectedPositions.includes(posId)) {
      setSelectedPositions(selectedPositions.filter((id) => id !== posId));
    } else {
      setSelectedPositions([...selectedPositions, posId]);
    }
  };

  const handleSave = async () => {
    const updatedSop = {
      sop_number,
      sop_name,
      topic: sopTopic,
      active,
      effective_date: formatDateTimeForSQL(effective_date),
      link,
      comment: sopComment,
      positions: selectedPositions,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `http://localhost:3010/api/sop/${currentSop.id}`,
        updatedSop,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      //console.log('Response:', response.data);
      alert('SOP updated successfully!');
      updatedSopData(
        {
          ...updatedSop,
        },
        currentSop.id
      );

      handleClose();
    } catch (error) {
      console.error('Error updating SOP:', error);
      console.error('Status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Edit SOP
        </Typography>

        <TableContainer>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  label="SOP Number"
                  value={sop_number}
                  fullWidth
                  disabled
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="SOP Name"
                  value={sop_name}
                  onChange={(e) => setSop_name(e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="active-select-label">Active</InputLabel>
                  <Select
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
                  fullWidth
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="topic-select-label">Topic</InputLabel>
                  <Select
                    label="Topic"
                    value={sopTopic}
                    onChange={(e) => setSopTopic(e.target.value)}
                    fullWidth
                  >
                    {topics.map((topic) => (
                      <MenuItem key={topic.ID} value={topic.ID}>
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
                  fullWidth
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <TextField
                  fullWidth
                  label="Comment"
                  value={sopComment}
                  onChange={(e) => setSopComment(e.target.value)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Positions Required for Training
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 4,
                      alignItems: 'flex-start',
                    }}
                  >
                    <FormControl fullWidth>
                      <FormLabel>Departments</FormLabel>
                      <FormGroup>
                        {departments.map((department) => (
                          <FormControlLabel
                            key={department.ID}
                            control={
                              <Checkbox
                                checked={selectedDepartments.includes(Number(department.ID))}
                                onChange={() => handleDepartmentToggle(department.ID)}
                              />
                            }
                            label={department.Name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>

                    <FormControl fullWidth>
                      <FormLabel>Positions</FormLabel>
                      <FormGroup>
                        {filteredPositions.length > 0 ? (
                          filteredPositions.map((position) => (
                            <FormControlLabel
                              key={position.ID}
                              control={
                                <Checkbox
                                  checked={selectedPositions.includes(Number(position.ID))}
                                  onChange={() => handlePositionToggle(position.ID)}
                                />
                              }
                              label={position.Name}
                            />
                          ))
                        ) : (
                          <Typography variant="body2">
                            Please select a department to view positions
                          </Typography>
                        )}
                      </FormGroup>
                    </FormControl>
                  </Box>
                </Paper>
              </TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SopModal;