// import React from "react";
// import { Container, Typography, Button } from "@mui/material";

// const NotAuthorized = () => (
//   <Container>
//     <Typography variant="h4" color="error" align="center" sx={{ mt: 5 }}>
//       Not allowed to access this page.
//     </Typography>
//    <Button 
//         variant="contained" 
//         sx={{ mt: 3 }}
//         onClick={() => window.history.back()}
//       >
//         Go Back
//       </Button>
//       </Container>

// );

// export default NotAuthorized;

import { Container, Typography, Button, Box } from "@mui/material";

const NotAuthorized = () => (
  <Container sx={{ textAlign: "center", mt: 8 }}>
    <Typography variant="h4" color="error" gutterBottom>
      Not allowed to access this page.
    </Typography>

    <Typography variant="body1" sx={{ mb: 4 }}>
      You don’t have permission to view this page.
    </Typography>

    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </Box>
  </Container>
);

export default NotAuthorized;
