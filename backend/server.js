const express  = require("express"); // Import the express library
const app = express(); // Define our app as an instance of express
const port = 3010; // Define our base URL as http:\\localhost:3000

const sites = [ { id: 1, name: 'Site 1'  }, 
                { id: 2, name: 'Site 2'  }, 
                { id: 3, name: 'Site 3'  }, ]; 

app.get('/api/sites', (req, res) => { res.json(sites); });
console.log(sites);
app.listen(port, function () {
  console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
});