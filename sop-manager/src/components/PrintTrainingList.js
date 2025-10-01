// import React from 'react'
// import { useRef } from 'react'
// import { Box, Button, Table, TableCell, TableRow, TableHead, TableBody, Paper } from '@mui/material';
// //import { useReactToPrint } from 'react-to-print';

// const PrintTrainingList = ({selectedEmployee, trainByEmployee}) => {
//      //const componentRef = useRef();

//     // const handlePrint = useReactToPrint({
//     //     content: () => componentRef.current,
//     // });

//   return (
//     <div>
//         {/* <div ref={componentRef}> */}

//         <Paper elevation={3} style={{ padding: '20px', marginBottom:'20px'}}>
//             <h1>Training Report</h1>
//             <p><strong>Employee:</strong>{selectedEmployee?.name}</p>
//             <Table> 
//                 <TableHead>PrintTrainingList</TableHead> 
                 
//                 <TableRow> 
//                     <TableCell>Training ID</TableCell> 
//                     <TableCell>Training Name</TableCell>
//                     <TableCell>Completed Date</TableCell>
//                 </TableRow> 
//                 <TableBody>


//                     {trainByEmployee.map((training) => (
//                         <TableRow key={training.trainig_id}>
                            
//                             <TableCell>{training.training_name}</TableCell>
//                             <TableCell>{training.sop_number}</TableCell>

//                             <TableCell>{training.training_date}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody> 
//             </Table>
//         </Paper> 
//         {/* </div> */}
//         <Button onClick={console.log("Print")}>Print</Button>

//         {console.log(selectedEmployee)}
//         {console.log(trainByEmployee)}
//     </div>
// )
  
// }

// export default PrintTrainingList;