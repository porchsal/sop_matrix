import React from "react";
import { Container, Typography } from "@mui/material";

const NotAuthorized = () => (
  <><Container>
    <Typography variant="h4" color="error" align="center" sx={{ mt: 5 }}>
      Not allowed to access this page.
    </Typography>
  </Container><button 
        onClick={() => window.history.back()}
        color="primary"
        >Go Back
        </button></>

);

export default NotAuthorized;
