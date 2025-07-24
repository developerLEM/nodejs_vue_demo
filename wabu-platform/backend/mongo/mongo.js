//################################################
// mongo.js
//################################################
// This module handles the connection to MongoDB using Mongoose.
// It exports a function to connect to the database and defines a simple schema for testing purposes.
// The connection is established using the URI provided in the environment variables or a default value.
// The module also includes event listeners for connection success, error, and disconnection events.
// This modular approach allows for easy updates or changes to the database connection logic without affecting other parts of the application.
// The schema defined in this module can be used to create and manipulate documents in the MongoDB database.
// This is useful for applications that require persistent data storage and retrieval.

/////////////////////////////////////////////////
// [REQUIRE] logger_console
/////////////////////////////////////////////////
// This module provides a simple logging utility that formats log messages with colors and caller file information.
// It uses the `chalk` library for color formatting and extracts the caller file information from the stack trace.
// The log levels are info, warn, and error, each with a different color and format.
// The logger is used throughout the application to log messages, making it easier to debug and monitor the application.
// The logger also includes a set of emojis defined in the `emojiSet` module,
// which are used to categorize and visually distinguish different types of log messages.
const wabuConsoleLogger = require("../logger/logger_console");

/////////////////////////////////////////////////
// [REQUIRE] mongoose
/////////////////////////////////////////////////
// This module is the Mongoose library, which is used to interact with MongoDB.
// Mongoose provides a schema-based solution to model application data, making it easier to work with MongoDB.
// It allows you to define schemas for your data, perform validations, and interact with the database using a more structured approach.
// Mongoose is used in this application to connect to MongoDB and define models for the data being stored.
// It simplifies the process of querying and manipulating data in MongoDB,
// providing a more intuitive API compared to the native MongoDB driver.
const wabuMongoose = require('mongoose');


/////////////////////////////////////////////////
// [FUNCTION] wabuMongooseConnect
/////////////////////////////////////////////////
const wabuMongooseConnect = async(dbURI) => {
  try {
    
    // Registra gli eventi prima di connettere

    // connected
    wabuMongoose.connection.on("connected", () => {
      wabuConsoleLogger.welcome(`[MONGO] Connessione a MongoDB riuscita! URI=[${dbURI}]`);
    });

    // error 
    wabuMongoose.connection.on("error", (err) => {
      wabuConsoleLogger.error(`[MONGO] Errore nella connessione MongoDB: ${err}`);
    });

    // disconnected
    wabuMongoose.connection.on("disconnected", () => {
      wabuConsoleLogger.warn(`[MONGO] Connessione a MongoDB interrotta!`);
    });

    // Connetti a MongoDB
    const conn = await wabuMongoose.connect(dbURI);

  } catch (error) {

    wabuConsoleLogger.error(`[MONGO] Errore durante la connessione a MongoDB: ${error.message}`);
    throw error; // Rilancia l'errore per gestirlo a livello superiore
    
  }
}

/////////////////////////////////////////////////
// [FUNCTION] wabuMongooseDisconnect
/////////////////////////////////////////////////
const wabuMongooseDisconnect = async() => {
  try {
    await wabuMongoose.connection.close();
    wabuConsoleLogger.goodbye(`[MONGO] Connessione a MongoDB chiusa!`);
  } catch (error) {
    wabuConsoleLogger.error(`[MONGO] Errore durante la disconnessione a MongoDB: ${error.message}`);
    throw error; // Rilancia l'errore per gestirlo a livello superiore
  }
}

/////////////////////////////////////////////////
// [SCHEMA] TestSchema
/////////////////////////////////////////////////
const TestSchema = wabuMongoose.Schema(
        { 
            nome: String,
            valore: Number 
        },
        //{ collection: "test" }
    );

//################################################
// EXPORTS
//################################################
module.exports = {
  wabuMongooseConnect,
  wabuMongooseDisconnect
};