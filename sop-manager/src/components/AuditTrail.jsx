// // src/components/AuditTrail.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidenav from './Sidenav';
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   TableContainer,
//   TextField,
//   TablePagination,
//   InputAdornment,
// } from '@mui/material';
// import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
// import SearchIcon from '@mui/icons-material/Search';
// import dayjs from 'dayjs';

// const AuditTrail = () => {
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // ✅ Fetch audit logs on mount
//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3010/api/audit-trail', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         setLogs(response.data);
//         setFilteredLogs(response.data);
//       } catch (error) {
//         console.error('Error fetching audit logs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, []);

//   // 🔍 Filtro dinámico
//   useEffect(() => {
//     const lowerTerm = searchTerm.toLowerCase();
//     const filtered = logs.filter(
//       (log) =>
//         log.username?.toLowerCase().includes(lowerTerm) ||
//         log.action?.toLowerCase().includes(lowerTerm) ||
//         log.entity?.toLowerCase().includes(lowerTerm)
//     );
//     setFilteredLogs(filtered);
//     setPage(0); // Resetear a la primera página cuando cambia el filtro
//   }, [searchTerm, logs]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={5}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <>
//     <Sidenav />
  
//     <Box sx={{ p: 4 }}>
//       {/* Header */}
//       <Box display="flex" alignItems="center" mb={3}>
//         <ManageHistoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
//         <Typography variant="h5" fontWeight="bold">
//           Audit Trail
//         </Typography>
//       </Box>

//       {/* Search bar */}
//       <Box mb={3} width="50%">
//         <TextField
//           fullWidth
//           size="small"
//           variant="outlined"
//           placeholder="Search by user, action or entity..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//             <TableRow>
//               <TableCell><b>User</b></TableCell>
//               <TableCell><b>Role</b></TableCell>
//               <TableCell><b>Action</b></TableCell>
//               <TableCell><b>Entity</b></TableCell>
//               <TableCell><b>Entity ID</b></TableCell>
//               <TableCell><b>Date</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLogs.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Typography color="text.secondary">No audit records found</Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredLogs
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((log, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>{log.username}</TableCell>
//                     <TableCell>{log.role}</TableCell>
//                     <TableCell>{log.action}</TableCell>
//                     <TableCell>{log.entity}</TableCell>
//                     <TableCell>{log.entity_id || '-'}</TableCell>
//                     <TableCell>{dayjs(log.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={filteredLogs.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 20, 50]}
//         sx={{ mt: 1 }}
//       />
//     </Box>
//     </>
//   );
// };

// export default AuditTrail;

// src/components/AuditTrail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidenav from './Sidenav';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TextField,
  TablePagination,
  InputAdornment,
  Button,
  Stack,
} from '@mui/material';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

const AuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 🔹 Estados para el rango de fechas
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // ✅ Fetch audit logs
  const fetchLogs = async (start, end) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const params = {};
      if (start && end) {
        params.startDate = start;
        params.endDate = end;
      }

      const response = await axios.get('http://localhost:3010/api/audit-trail', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params,
      });

      setLogs(response.data);
      setFilteredLogs(response.data);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // 🔍 Filtro por texto
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = logs.filter(
      (log) =>
        log.username?.toLowerCase().includes(lowerTerm) ||
        log.action?.toLowerCase().includes(lowerTerm) ||
        log.entity?.toLowerCase().includes(lowerTerm)
    );
    setFilteredLogs(filtered);
    setPage(0);
  }, [searchTerm, logs]);

  // 🔸 Aplicar filtro de fechas
  const handleFilterByDate = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    fetchLogs(startDate, endDate);
  };

  const handleResetDates = () => {
    setStartDate('');
    setEndDate('');
    fetchLogs();
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Sidenav />
      <Box sx={{ p: 4 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" mb={3}>
          <ManageHistoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Audit Trail
          </Typography>
        </Box>

        {/* Filtros superiores */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <TextField
            label="Start Date"
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterByDate}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetDates}
          >
            Reset
          </Button>
        </Stack>

        {/* Search bar */}
        <Box mb={3} width="50%">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search by user, action or entity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><b>User</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                <TableCell><b>Action</b></TableCell>
                <TableCell><b>Entity</b></TableCell>
                <TableCell><b>Entity ID</b></TableCell>
                <TableCell><b>Date</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">No audit records found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((log, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{log.username}</TableCell>
                      <TableCell>{log.role}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.entity}</TableCell>
                      <TableCell>{log.entity_id || '-'}</TableCell>
                      <TableCell>{dayjs(log.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredLogs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
          sx={{ mt: 1 }}
        />
      </Box>
    </>
  );
};

export default AuditTrail;

