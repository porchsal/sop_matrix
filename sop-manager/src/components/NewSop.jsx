/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
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
    Paper,
    FormControl,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormLabel
} from "@mui/material";
import Sidenav from "./Sidenav";
import { useNavigate } from "react-router-dom";
import DatePickerComponent from "./DatePickerComponent";
import formatDateTimeForSQL from "../helpers/formatDateTimeForSQL";

const NewSop = () => {
    const [sopNumber, setSopNumber] = useState("");
    const [sopTitle, setSopTitle] = useState("");
    const [sopTopic, setSopTopic] = useState("");
    const [sopEffectiveDate, setSopEffectiveDate] = useState(null);
    const [sopLink, setSopLink] = useState("");
    const [sopComment, setSopComment] = useState("");
    const [sopStatus, setSopStatus] = useState("");
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);
    const [sites, setSites] = useState([]);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const [departmentRes, sitesRes, topicsRes, positionsRes] = await Promise.all([
                    axios.get("http://localhost:3010/api/department"),
                    axios.get("http://localhost:3010/api/sites"),
                    axios.get("http://localhost:3010/api/topics"),
                    axios.get("http://localhost:3010/api/position")
                ]);

                setDepartments(departmentRes.data);
                setSites(sitesRes.data);
                setTopics(topicsRes.data);
                setPositions(positionsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedDepartments.length === 0) {
            setFilteredPositions([]);
            setSelectedPositions([]);
            return;
        }

        const filtered = positions.filter((position) =>
            selectedDepartments.includes(Number(position.Department_ID ?? position.department_id))
        );

        setFilteredPositions(filtered);

        // Limpia selectedPositions si alguna ya no pertenece a los departments seleccionados
        setSelectedPositions((prev) =>
            prev.filter((selectedId) =>
                filtered.some((position) => Number(position.ID) === Number(selectedId))
            )
        );
    }, [selectedDepartments, positions]);

    const addSop = async (newSop) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:3010/api/sop/newsop",
                newSop,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("SOP added successfully:", response.data);
            navigate("/sop");
        } catch (error) {
            console.error("Error adding SOP:", error);
             console.error('Status:', error.response?.status);
            console.log('Response data object:', error.response?.data);
            console.log('Response data JSON:', JSON.stringify(error.response?.data, null, 2));
        }
    };

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
        const formattedEffectiveDate = formatDateTimeForSQL(sopEffectiveDate);

        const newSop = {
            sop_number: sopNumber,
            sop_name: sopTitle,
            topic: sopTopic,
            effective_date: formattedEffectiveDate,
            link: sopLink,
            comment: sopComment,
            active: sopStatus,
            positions: selectedPositions
        };
        //console.log("New SOP to be added:", newSop);
        console.log("REQ BODY:", JSON.stringify(newSop, null, 2));
        await addSop(newSop);
    };

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
                                    label="SOP Title"
                                    value={sopTitle}
                                    onChange={(e) => setSopTitle(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell
                                sx={{
                                    mt: 2,
                                    width: "50%",
                                    "& .MuiInputBase-root": {
                                        fontSize: "1.25rem"
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontSize: "1.25rem"
                                    }
                                }}
                            >
                                <DatePickerComponent
                                    date={sopEffectiveDate}
                                    setDate={setSopEffectiveDate}
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
                            <TableCell colSpan={2}>
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
                                    value={sopStatus}
                                    onChange={(e) => setSopStatus(e.target.value)}
                                    fullWidth
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
                                    value={sopTopic}
                                    onChange={(e) => setSopTopic(e.target.value)}
                                    variant="standard"
                                    fullWidth
                                    required
                                >
                                    {topics.map((topic) => (
                                        <MenuItem key={topic.ID} value={topic.ID}>
                                            {topic.Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>
                                <Paper sx={{ p: 2, width: "100%" }}>
                                    <Typography variant="h5" gutterBottom>
                                        Select Positions Required for Training
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 4,
                                            alignItems: "flex-start"
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
                                                                checked={selectedDepartments.includes(
                                                                    Number(department.ID)
                                                                )}
                                                                onChange={() =>
                                                                    handleDepartmentToggle(
                                                                        department.ID
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={department.Name}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </FormControl>

                                        {selectedDepartments.length > 0 ? (
                                            <FormControl fullWidth>
                                                <FormLabel>Positions</FormLabel>
                                                <FormGroup>
                                                    {filteredPositions.length > 0 ? (
                                                        filteredPositions.map((position) => (
                                                            <FormControlLabel
                                                                key={position.ID}
                                                                control={
                                                                    <Checkbox
                                                                        checked={selectedPositions.includes(
                                                                            Number(position.ID)
                                                                        )}
                                                                        onChange={() =>
                                                                            handlePositionToggle(
                                                                                position.ID
                                                                            )
                                                                        }
                                                                    />
                                                                }
                                                                label={position.Name}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Typography variant="body2">
                                                            No positions found for the selected department(s)
                                                        </Typography>
                                                    )}
                                                </FormGroup>
                                            </FormControl>
                                        ) : (
                                            <Box>
                                                <Typography variant="body1">
                                                    Please select a department to view positions
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Paper>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                    <TableRow component={Paper}>
                        <Box sx={{ 
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            p: 2,
                            width: "100%"
                            }}>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                            >
                                Save
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate(-1)}
                            >
                                Close
                            </Button>
                        </Box>
                    </TableRow>
                </Table>
            </Box>
        </>
    );
};

export default NewSop;