import React from 'react'
import { useState } from 'react'
import Sidenav from './sidenav'
import { Paper, Box, Table, TableBody, TableCell, Typography, Button } from '@mui/material'
import AddUserModal from './AddUserModal';
import ListUsersModal from './ListUsersModal';
export default function Users() {
    const [openUser, setOpenUser] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [data, setData] = useState([]); // Almacena los datos de la lista actual

    const handleOpenUser = () => {
        setOpenUser(true);
    }

    const handleCloseUser = () => {
        setOpenUser(false);
    }

    const addUser = (newUser) => {
        setData((prevData) => [...prevData, newUser]);
    }

    const handleOpenList = () => {
        setOpenList(true);
    }

    const handleCloseList = () => { 
        setOpenList(false);
    }


  return (
    <>
        <Sidenav />
        <Paper>
            <Box p={2}>
                <Typography variant="h4">Users</Typography>
                <Table>
                    <TableBody>
                        <TableCell>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={handleOpenList}
                                >List Users</Button>
                        </TableCell>
                        <TableCell>
                            <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleOpenUser}
                            >Add User</Button>
                        </TableCell>
                        
                    </TableBody>
                </Table>
            </Box>

        </Paper>

        <AddUserModal
            open={openUser}
            handleClose={handleCloseUser}
            newUser={addUser}
        />
        <ListUsersModal
            open={openList}
            handleClose={handleCloseList}
            newUser={addUser}
        />




    </>
  )
}
