import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, TextField, Box, Typography, Button, TableContainer, TableBody, TableCell, TableRow, Select, MenuItem } from '@mui/material';

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

const NewSopModal = ({ open, handleClose, addSop }) => {
    const [sopNumber, setSopNumber] = useState();
    const [sopTittle, setSopTittle] = useState();
    const [sopTopic, setSopTopic] = useState();
    const [sopEffectiveDate, setSopEffectiveDate] = useState();
    const [sopLink, setSopLink] = useState();
    const [sopComment, setSopComment] = useState();
    const [sopStatus, setSopStatus] = useState();
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3010/api/position');
                setPositions(response.data);
                const response2 = await axios.get('http://localhost:3010/api/department');
                setDepartments(response2.data);
                const response3 = await axios.get('http://localhost:3010/api/sites');
                setSites(response3.data);
                const response4 = await axios.get('http://localhost:3010/api/topic');
                setTopic(response4.data);
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








};

