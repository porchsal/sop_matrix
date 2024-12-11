const express  = require("express"); // Import the express library
const cors = require('cors'); // Import the cors library
const app = express(); // Define our app as an instance of express
const port = 3010; // Define our base URL as http:\\localhost:3000
const sitesRouter = require("./database/routes/sites_routes.js"); // Import our sites router
const departmentRouter = require("./database/routes/department_routes.js"); // Import our department router
const positionRouter = require("./database/routes/position_routes.js"); // Import our position router
const employeeRouter = require("./database/routes/employee_routes.js"); // Import our employee router
//Configurate cors

app.use(cors({ origin: 'http://localhost:5173' 
  })); // Enable Cross-Origin Resource Sharing
app.use(express.static("public")); // Serve static files from the public directory
app.use(express.json()); // Enable JSON parsing


app.use("/api", sitesRouter); // Use our sites router
app.use("/api", departmentRouter); // Use our department router
app.use("/api", positionRouter); // Use our position router
app.use("/api", employeeRouter); // Use our employee router
//console.log(positionRouter);

app.listen(port, function () {
  console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
});