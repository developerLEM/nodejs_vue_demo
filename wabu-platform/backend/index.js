//################################################
// index.js
//################################################
// This is the main entry point for the backend of the Wabu platform.
// It sets up the Express server, connects to MongoDB, and initializes various routes and middleware.
// The server listens for incoming requests and handles them accordingly.
// It also includes logging functionality to track requests and errors.
// The server is designed to be modular, allowing for easy updates and additions as the application evolves.
// The code is structured to provide a clear separation of concerns, with different modules handling specific functionalities such as logging, emoji management, and database interactions.
// This modular approach allows for better maintainability and scalability of the application.
// The server is configured to run on port 3000, and it uses CORS to allow cross-origin requests.
// The MongoDB connection is established using Mongoose, which provides a simple way to interact with the database.
// The server also includes a test route to verify the MongoDB connection and functionality.
// The code is written in JavaScript and follows best practices for Node.js development,
// ensuring that it is efficient, readable, and easy to understand.

/////////////////////////////////////////////////
// [REQUIRE] .env
/////////////////////////////////////////////////
// This module loads environment variables from a `.env` file into `process.env`.
// It allows you to define configuration settings such as database URIs, API keys, and other sensitive information in a separate file.
// This is useful for keeping sensitive information out of your source code and allows for easier configuration management across different environments (development, testing, production).
// The `.env` file should not be committed to version control to protect sensitive information.
require("dotenv").config();

/////////////////////////////////////////////////
// [REQUIRE] logger_console
/////////////////////////////////////////////////
// This module provides a simple logging utility that formats log messages with colors and caller file information.
// It uses the `chalk` library for color formatting and extracts the caller file information from the stack trace.
// The log levels are info, warn, and error, each with a different color and format.
// The logger is used throughout the application to log messages, making it easier to debug and monitor the application.
// The logger also includes a set of emojis defined in the `emojiSet` module,
// which are used to categorize and visually distinguish different types of log messages.
const wabuConsoleLogger = require("./logger/logger_console");

/////////////////////////////////////////////////
// [REQUIRE] logger_file
/////////////////////////////////////////////////
// This module provides a utility for logging messages to a file.
// It formats the log messages with a timestamp and writes them to a specified log file.
// The log file is created in a dedicated directory, and the messages are appended to the file  
const wabuFileLogger = require("./logger/logger_file");

/////////////////////////////////////////////////
// [REQUIRE] express
/////////////////////////////////////////////////
// This module is the Express framework, which is used to create the backend server.
// Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// It allows you to define routes, handle requests, and manage middleware.
// The Express server is set up to listen for incoming requests and respond accordingly.
const wabuServerExpress = require('express');

/////////////////////////////////////////////////
// [REQUIRE] cors
/////////////////////////////////////////////////
// This module is used to enable Cross-Origin Resource Sharing (CORS) in the Express server.
// CORS is a security feature that allows or restricts resources requested from another domain outside the domain from which the first resource was served.
// By using the CORS middleware, the server can handle requests from different origins, which is useful for frontend-backend communication in web applications.
// This is particularly important when the frontend and backend are hosted on different domains or ports, as it allows the frontend to make requests to the backend without running into CORS issues.
const wabuCors = require('cors');

/////////////////////////////////////////////////
// [REQUIRE] mongo
/////////////////////////////////////////////////
// This module is used to connect to MongoDB using Mongoose, a popular ODM (Object Data Modeling) library for Node.js.
// Mongoose provides a schema-based solution to model application data, making it easier to work with MongoDB.
// It allows you to define schemas for your data, perform validations, and interact with the database using a more structured approach.
// Mongoose is used in this application to connect to MongoDB and define models for the data being stored.
// It simplifies the process of querying and manipulating data in MongoDB,
// providing a more intuitive API compared to the native MongoDB driver.
const {wabuMongooseConnect}  = require('./mongo/mongo');


// Normal console log for debugging purposes
// This is a simple console log to indicate that the application has started.
console.log("------------------------------");
console.log("[index.js] CIAO BRUNO!");
console.log("------------------------------");


/////////////////////////////////////////////////
// APP
/////////////////////////////////////////////////
// This code sets up a simple Express server that listens for incoming requests.
// It uses the CORS middleware to allow cross-origin requests, which is useful for frontend-backend communication.
wabuConsoleLogger.info("[BACKEND - EXPRESS] Inizializzazione del server Express...");
const wabuApp = wabuServerExpress();

/////////////////////////////////////////////////
// [MIDDLEWARE] CORS
/////////////////////////////////////////////////
// CORS middleware to allow cross-origin requests
// This is useful if your frontend and backend are running on different ports or domains.
// It allows the frontend to make requests to the backend without CORS issues.
wabuConsoleLogger.info("[BACKEND - EXPRESS] Abilitazione CORS per richieste cross-origin...");
wabuApp.use(wabuCors());

/////////////////////////////////////////////////
// [MONGO] connection
/////////////////////////////////////////////////
// Connect to MongoDB using Mongoose
// This code connects to the MongoDB database using Mongoose.
// It uses the `wabuMongooseConnect` function to establish the connection and handle events
// such as successful connection, error, and disconnection.
const mongoPORT = process.env.PORT_MONGO || 27017; // Use environment variable or default to 27017
const mongoURI = process.env.MONGO_DB || `mongodb://mongo:${mongoPORT}/wabu_demo`; // Use environment variable or default to MongoDB URI
wabuConsoleLogger.info(`[MONGO] Connessione a MongoDB, URI=[${mongoURI}]`);
async function connectMongoDB() {
  try {
    await wabuMongooseConnect(mongoURI);
    //wabuConsoleLogger.success(`[MONGO] Connessione a MongoDB riuscita! URI=[${mongoURI}]`);
    wabuFileLogger.wabuFileLogMongo(`Connessione a MongoDB riuscita! URI=[${mongoURI}]`);
  } catch (error) {
    //wabuConsoleLogger.error(`[MONGO] Errore durante la connessione a MongoDB: ${error.message}`);
    throw error; // Rilancia l'errore per gestirlo a livello superiore 
  }
}
connectMongoDB().catch(err => {
  wabuConsoleLogger.error(`[MONGO] Errore durante la connessione a MongoDB: ${err.message}`);
  wabuFileLogger.wabuFileLogMongo(`Errore durante la connessione a MongoDB: ${err.message}`);
  //process.exit(1); // Exit the process if the connection fails
});


/////////////////////////////////////////////////
// START SERVER
/////////////////////////////////////////////////
// Start the server on port 3000
// This code starts the Express server and listens for incoming requests on port 3000.
const PORT_HTTP = process.env.PORT_HTTP || 3000; // Use environment variable or default to 3000
wabuConsoleLogger.info(`[BACKEND - EXPRESS] Avvio del server Express sulla porta ${PORT_HTTP}...`);
wabuApp.listen(PORT_HTTP, () => {

  // Log a success message when the server is successfully started
  wabuConsoleLogger.success(`[HTTP] Backend in ascolto su http://localhost:${PORT_HTTP} (${new Date().toLocaleString()})`);
  wabuFileLogger.wabuFileLogServer(`Backend in ascolto su http://localhost:${PORT_HTTP} (${new Date().toLocaleString()})`);

});

/////////////////////////////////////////////////
// [MIDDLEWARE] '/' route
/////////////////////////////////////////////////
// Middleware to log incoming requests
// This middleware logs the IP address of the incoming request and the current date/time.
wabuConsoleLogger.info("[BACKEND - EXPRESS] Middleware per log delle richieste in arrivo... [route '/']");
wabuApp.get('/', (req, res) => {

  // Log the incoming request with the current date and time
  wabuConsoleLogger.success(`[ROUTE GET][/] Richiesta ricevuta da [${req.ip}] al [${new Date().toISOString()}]`);
  
  // Send a welcome message as the response
  res.send(`[index.js] 👋 Benvenuto dal backend! Il tuo IP è: [${req.ip}]`);

});





/*
// Define a simple Mongoose schema and model for testing
// This code defines a Mongoose schema for a collection named "Test" with a single field "nome" of type String.
// It also creates a Mongoose model named "Test" based on the schema.
// The model can be used to create, read, update, and delete documents in the "Test" collection in MongoDB.
console.log("[index.js] MONGOOSE - MODELLO  DI TEST");
const TestSchema = new mongoose.Schema({ nome: String });
const Test = mongoose.model('Test', TestSchema);

/////////////////////////////////////////////////
// [MIDDLEWARE] '/test-mongo' route
/////////////////////////////////////////////////
// Define a route to test MongoDB connection
// This code defines a route `/test-mongo` that creates a new document in the "Test" collection with the name "Ciao Mongo!".
// When this route is accessed, it saves the document to MongoDB and sends a response indicating that the document has been saved.
// This is useful for testing the MongoDB connection and ensuring that the backend can interact with the database.
wabuConsoleLogger.info("[BACKEND - EXPRESS] Middleware per log delle richieste in arrivo... [route '/test-mongo']");
wabuApp.get('/test-mongo', async (req, res) => {

  // Log the incoming request with the current date and time
  wabuConsoleLogger.success(`[ROUTE GET][/test-mongo] Richiesta ricevuta da [${req.ip}] al [${new Date().toISOString()}]`);

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
*/
