require('dotenv').config(); // Load environment variables from a .env file into process.env
const express  = require("express"); // Import the express library
const cookieParser = require('cookie-parser'); // Import the cookie-parser library
const cors = require('cors'); // Import the cors library
const app = express(); // Define our app as an instance of express
const port = process.env.DB_PORT; // Define our base URL as http:\\localhost:3000
const sitesRouter = require("./database/routes/sites_routes.js"); // Import our sites router
const departmentRouter = require("./database/routes/department_routes.js"); // Import our department router
const positionRouter = require("./database/routes/position_routes.js"); // Import our position router
const employeeRouter = require("./database/routes/employee_routes.js"); // Import our employee router
const sopRouter = require("./database/routes/sop_routes.js"); // Import our sop router
const trainingRouter = require("./database/routes/training_routes.js"); // Import our training router
const topicRouter = require("./database/routes/topic_routes.js"); // Import our topic router
const protectedRoutes = require("./database/routes/protected_routes.js"); // Import our protected routes
const userRouter = require("./database/routes/user_routes.js"); // Import our user router
const session = require("express-session");
//Configurate cors

app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
  })); // Enable Cross-Origin Resource Sharing
app.use(express.static("public")); // Serve static files from the public directory
app.use(express.json()); // Enable JSON parsing
app.use(cookieParser()); // Enable cookie parsing
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use("/api", sitesRouter); // Use our sites router
app.use("/api", departmentRouter); // Use our department router
app.use("/api", positionRouter); // Use our position router
app.use("/api", employeeRouter); // Use our employee router
app.use("/api", sopRouter); // Use our sop router
app.use("/api", trainingRouter); // Use our training router
app.use("/api", topicRouter); // Use our topic router
app.use("/api", protectedRoutes); // Use our protected routes
app.use("/api", userRouter); // Use our user router


app.listen(port, function () {
  console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
});