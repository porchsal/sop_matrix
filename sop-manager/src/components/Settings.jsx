import { useState } from 'react'
import { Paper, Box, Typography, Table, Button, TableRow, TableCell, TableBody, TableHead} from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Sidenav from './Sidenav'
import axios from 'axios'
import AddSiteModal from './AddSiteModal'
import AddTopicModal from './AddTopicModal'
import AddDepartmentModal from './AddDepartmentModal'
import AddPositionModal from './AddPositionModal'

function Settings() {
 
    const [data, setData] = useState([]); // Almacena los datos de la lista actual
    const [open, setOpen] = useState(false);
    const [modalTittle, setModalTittle] = useState('');
    const [openSite, setOpenSite] = useState(false);
    const [openTopic, setOpenTopic] = useState(false);
    const [openDepartment, setOpenDepartment] = useState(false);
    const [openPosition, setOpenPosition] = useState(false);

    const fetchData = async (endpoint) => {
        try {
            ('Fetching data from:', endpoint);
            const response = await axios.get(`http://localhost:3010/api/${endpoint}`);
            setData(response.data); // Actualiza los datos de la lista
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
   
    const handleOpenModal = (title, endpoint) => {
        setModalTittle(title);
        fetchData(endpoint);
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleOpenSite = () => {
        setOpenSite(true);
    }

    const handleCloseSite = () => {
        setOpenSite(false);
    }

    const handleOpenTopic = () => {
        setOpenTopic(true);
    }

    const handleCloseTopic = () => {
        setOpenTopic(false);
    }

    const handleOpenDepartment = () => {
        setOpenDepartment(true);
    }

    const handleCloseDepartment = () => {
        setOpenDepartment(false);
    }

    const handleOpenPosition = () => {
        setOpenPosition(true);
    }

    const handleClosePosition = () => {
        setOpenPosition(false);
    }

    const settingsConfig = [
        {
            label: 'Sites',
            listLabel: 'List Sites',
            addLabel: 'Add Site',
            listType: 'Sites',
            endpoint: 'sites',
            onAddClick: handleOpenSite,
        },
        {
            label: 'Departments',
            listLabel: 'List Departments',
            addLabel: 'Add Department',
            listType: 'Departments',
            endpoint: 'department',
            onAddClick: handleOpenDepartment,
        },
        {
            label: 'Positions',
            listLabel: 'List Positions',
            addLabel: 'Add Position',
            listType: 'Position',
            endpoint: 'position',
            onAddClick: handleOpenPosition,
        },
        {
            label: 'Topics',
            listLabel: 'List Topics',
            addLabel: 'Add Topic',
            listType: 'Topics',
            endpoint: 'topics',
            onAddClick: handleOpenTopic,
        },
    ]
    

    const addSite = (newSite) => {
        setData((prevData) => [...prevData, newSite]);
    };

    const addTopic = (newTopic) => {
        setData((prevData) => [...prevData, newTopic]);
    };

    const addDepartment = (newDepartment) => {
        setData((prevData) => [...prevData, newDepartment]);
    };

    const addPosition = (newPosition) => {
        setData((prevData) => [...prevData, newPosition]);
    };

  return (
    <>
    <Sidenav />
    <Paper elevation={3} sx={{ padding: 4, margin: 4 }}>
    <Box>
        <Typography variant="h4" align="center" gutterBottom>
            Settings
        </Typography>
        <Table>
            <TableBody>
                {settingsConfig.map((config, index) => (
                    <TableRow key={index}>
                        <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>
                        {config.label}
                        </TableCell>
                        <TableCell align="right" sx={{ width: '70%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleOpenModal(config.listType, config.endpoint)
                                    }
                                    sx={{
                                        width: 150, // Ancho fijo igual que el otro botón
                                        height: 40, // Alto fijo igual que el otro botón
                                        fontSize: '0.875rem',
                                    }}
                                    
                                >
                                    {config.listLabel}
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => {config.onAddClick()}}
                                    sx={{
                                        width: 150, // Ancho fijo igual que el otro botón
                                        height: 40, // Alto fijo igual que el otro botón
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {config.addLabel}
                                </Button>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
    </Box>
</Paper>

{/* Modal */}

<Dialog open={open} onClose={handleCloseModal} maxWidth="5m">
    <DialogTitle>{modalTittle} List</DialogTitle>
    <DialogContent>
        {data.length > 0 ? (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.ID}>
                            <TableCell>{item.ID}</TableCell>
                            <TableCell>{item.Name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : (
            <Typography variant="body1">No data found</Typography>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseModal}>Close</Button>
    </DialogActions>
</Dialog>

 {/* Modal de Agregar Sitio */}
    <AddSiteModal
        open={openSite}
        handleClose={handleCloseSite}
        addSite={addSite}
    />


{/* Modal de Agregar Tema */}
    <AddTopicModal
        open={openTopic}
        handleClose={handleCloseTopic}
        addTopic={addTopic}
    />
{/* Modal de Agregar Departamento */}
    <AddDepartmentModal
        open={openDepartment}
        handleClose={handleCloseDepartment}
        addDepartment={addDepartment}
    />
{/* Modal de Agregar Posicion */}
    <AddPositionModal
        open={openPosition}
        handleClose={handleClosePosition}
        addPosition={addPosition}
    />

    </>
  )
}

export default Settings;
