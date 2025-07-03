console.log("------------------------------");
console.log("[index.js] CIAO BRUNO!");
console.log("------------------------------");

// EXPRESS SERVER - BACKEND
// This code sets up a simple Express server that listens for incoming requests.
// It uses the CORS middleware to allow cross-origin requests, which is useful for frontend-backend communication.
console.log("[index.js] EXPRESS SERVER - BACKEND");
const express = require('express');
const app = express();

// CORS middleware to allow cross-origin requests
// This is useful if your frontend and backend are running on different ports or domains.
// It allows the frontend to make requests to the backend without CORS issues.
console.log("[index.js] EXPRESS SERVER - CORS");
const cors = require('cors');
app.use(cors());


// Middleware to log incoming requests
// This middleware logs the IP address of the incoming request and the current date/time.
console.log("[index.js] EXPRESS SERVER - MIDDLEWARE");
app.get('/', (req, res) => {
  console.log(`[index.js] 📥  Richiesta ricevuta da [${req.ip}] al [${new Date().toISOString()}]`);
  res.send(`[index.js] 👋 Benvenuto dal backend! Il tuo IP è: [${req.ip}]`);
});

// Start the server on port 3000
// This code starts the Express server and listens for incoming requests on port 3000.
console.log("[index.js] EXPRESS SERVER - START");
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[index.js] 🚀 Backend in ascolto su http://localhost:${PORT} (${new Date().toLocaleString()})`);
});
