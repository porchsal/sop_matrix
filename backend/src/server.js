// require('dotenv').config(); // Load environment variables from a .env file into process.env
// const express  = require("express"); // Import the express library
// const cookieParser = require('cookie-parser'); // Import the cookie-parser library
// const cors = require('cors'); // Import the cors library
// const app = express(); // Define our app as an instance of express
// const port = process.env.DB_PORT; // Define our base URL as http:\\localhost:3000
// const sitesRouter = require("./database/routes/sites_routes.js"); // Import our sites router
// const departmentRouter = require("./database/routes/department_routes.js"); // Import our department router
// const positionRouter = require("./database/routes/position_routes.js"); // Import our position router
// const employeeRouter = require("./database/routes/employee_routes.js"); // Import our employee router
// const sopRouter = require("./database/routes/sop_routes.js"); // Import our sop router
// const trainingRouter = require("./database/routes/training_routes.js"); // Import our training router
// const topicRouter = require("./database/routes/topic_routes.js"); // Import our topic router
// const protectedRoutes = require("./database/routes/protected_routes.js"); // Import our protected routes
// const userRouter = require("./database/routes/user_routes.js"); // Import our user router
// const auditRouter = require("./database/routes/audit_routes.js"); // Import our audit router
// const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
// //Configurate cors

// app.use(cors({ 
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
//   })); // Enable Cross-Origin Resource Sharing


//   app.options('*', (req, res) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.set('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(204);
//   });
  
//   app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Opción más segura: especificar tu dominio
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next(); // Pasa al siguiente middleware o ruta
//   });

// app.use(express.static("public")); // Serve static files from the public directory
// app.use(express.json()); // Enable JSON parsing
// app.use(cookieParser()); // Enable cookie parsing
// // app.use(session({
// //   secret: process.env.JWT_SECRET,
// //   resave: false,
// //   saveUninitialized: true,
// //   cookie: { secure: false }
// // }))

// // MySQL session store configuration
// const sessionStoreOptions = {
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   clearExpired: true,
//   checkExpirationInterval: 900000, // Check for expired sessions every 15 minutes
//   expiration: 86400000, // Session expiration time (1 day)
//   createDatabaseTable: true,
//   schema: {
//     tableName: 'sessions',
//     columnNames: {
//       session_id: 'session_id',
//       expires: 'expires',
//       data: 'data'
//     }
//   }
// };

// const sessionStore = new MySQLStore(sessionStoreOptions);

// app.use(session({
//   secret: process.env.JWT_SECRET,
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//     secure: false, 
//     maxAge: 86400000 // 1 day
//   } 
// }));

// app.use("/api", sitesRouter); // Use our sites router
// app.use("/api", departmentRouter); // Use our department router
// app.use("/api", positionRouter); // Use our position router
// app.use("/api", employeeRouter); // Use our employee router
// app.use("/api", sopRouter); // Use our sop router
// app.use("/api", trainingRouter); // Use our training router
// app.use("/api", topicRouter); // Use our topic router
// app.use("/api", protectedRoutes); // Use our protected routes
// app.use("/api", userRouter); // Use our user router
// app.use("/api", auditRouter); // Use our audit router

// app.listen(port, function () {
//   console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
// });

// const path = require("path");

// // Catch-all: enviar index.html para cualquier ruta que no sea /api
// app.get("*", (req, res) => {
//   // Ignora las rutas de API
//   if (req.originalUrl.startsWith("/api")) return res.status(404).send("API route not found");

//   res.sendFile(path.join(__dirname, "../sop-manager/index.html"));
// });

require('dotenv').config();
const express  = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.DB_PORT;
const sitesRouter = require("./database/routes/sites_routes.js");
const departmentRouter = require("./database/routes/department_routes.js");
const positionRouter = require("./database/routes/position_routes.js");
const employeeRouter = require("./database/routes/employee_routes.js");
const sopRouter = require("./database/routes/sop_routes.js");
const trainingRouter = require("./database/routes/training_routes.js");
const topicRouter = require("./database/routes/topic_routes.js");
const protectedRoutes = require("./database/routes/protected_routes.js");
const userRouter = require("./database/routes/user_routes.js");
const auditRouter = require("./database/routes/audit_routes.js");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// MySQL session store configuration
const sessionStoreOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

// Debug: mostrar configuración (quita las credenciales después)
console.log('Session Store Configuration:', {
  host: sessionStoreOptions.host,
  port: sessionStoreOptions.port,
  user: sessionStoreOptions.user,
  database: sessionStoreOptions.database,
  hasPassword: !!sessionStoreOptions.password
});

const sessionStore = new MySQLStore(sessionStoreOptions);

// Forzar creación de tabla y manejar errores
sessionStore.onReady = function() {
  console.log('✅ MySQLStore ready and sessions table created/verified');
};

sessionStore.on('error', function(error) {
  console.error('❌ MySQLStore Error:', error);
});

// Forzar creación explícita
sessionStore.createDatabaseTable(function(err) {
  if (err) {
    console.error('❌ Error creating sessions table:', err);
  } else {
    console.log('✅ Sessions table created successfully or already exists');
  }
});

app.use(session({
  secret: process.env.JWT_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    maxAge: 86400000
  } 
}));

app.use("/api", sitesRouter);
app.use("/api", departmentRouter);
app.use("/api", positionRouter);
app.use("/api", employeeRouter);
app.use("/api", sopRouter);
app.use("/api", trainingRouter);
app.use("/api", topicRouter);
app.use("/api", protectedRoutes);
app.use("/api", userRouter);
app.use("/api", auditRouter);

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});

const path = require("path");

app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) return res.status(404).send("API route not found");
  res.sendFile(path.join(__dirname, "../sop-manager/index.html"));
});