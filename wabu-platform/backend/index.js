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

// MONGOOSE - BACKEND
// This code connects to a MongoDB database using Mongoose, a popular ODM (Object Data Modeling) library for Node.js.
// It allows you to define schemas and models for your data, making it easier to interact with MongoDB.
// The connection string uses the service name "mongo" as defined in the docker-compose file, which allows the backend to connect to the MongoDB service running in a Docker container.
console.log("[index.js] MONGOOSE - BACKEND");
const mongoose = require('mongoose');

// Connessione a MongoDB (il nome del servizio è "mongo" come definito in docker-compose)
// This code connects to the MongoDB database named "wabu_demo".
// The connection string specifies the database host, port, and name.
// The `useNewUrlParser` and `useUnifiedTopology` options are used to avoid deprecation warnings in Mongoose.
mongoose.connect('mongodb://mongo:27017/wabu_demo', {
  //useNewUrlParser: true, //Warning: useNewUrlParser is a deprecated option
  //useUnifiedTopology: true, ////Warning: useNewUrlParser is a deprecated option
})
.then(() => console.log('[index.js] ✅ Connesso a MongoDB!'))
.catch(err => console.error('[index.js] ❌ Errore connessione MongoDB:\n', err));

// Define a simple Mongoose schema and model for testing
// This code defines a Mongoose schema for a collection named "Test" with a single field "nome" of type String.
// It also creates a Mongoose model named "Test" based on the schema.
// The model can be used to create, read, update, and delete documents in the "Test" collection in MongoDB.
console.log("[index.js] MONGOOSE - MODELLO  DI TEST");
const TestSchema = new mongoose.Schema({ nome: String });
const Test = mongoose.model('Test', TestSchema);

// Define a route to test MongoDB connection
// This code defines a route `/test-mongo` that creates a new document in the "Test" collection with the name "Ciao Mongo!".
// When this route is accessed, it saves the document to MongoDB and sends a response indicating that the document has been saved.
// This is useful for testing the MongoDB connection and ensuring that the backend can interact with the database.
app.get('/test-mongo', async (req, res) => {

  console.log("[index.js] MONGOOSE - ROUTE DI TEST");

  // Aggiorna (o crea se non esiste) un documento con nome fisso
  const result = await Test.findOneAndUpdate(
    { nome: 'Ciao Mongo!' }, // filtro
    { nome: 'Ciao Mongo!', data: new Date() }, // dati da aggiornare
    { upsert: true, new: true } // crea se non esiste, restituisci il nuovo
  );
  res.send('[index.js] Documento aggiornato su MongoDB!');

  // Crea un nuovo documento di test e lo salva su MongoDB (ogni volta un documento nuovo)
  //const doc = new Test({ nome: 'Ciao Mongo!' });
  //console.log("[index.js] Creo e salvo un documento di test in MongoDB:\n", doc);
  //await doc.save();
  //res.send('[index.js] Documento salvato su MongoDB!');

});
