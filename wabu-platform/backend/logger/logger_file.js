//################################################
// logger_file.js
//################################################
// This module provides a utility for logging messages to a file.
// It formats the log messages with a timestamp and writes them to a specified log file.
// The log file is created in a dedicated directory, and the messages are appended to the file.
// This utility is useful for maintaining a persistent log of application events, errors, and other important messages.
// The log messages can be used for debugging, monitoring, and auditing purposes.
// The module exports a function that takes a file name and a message, formats the message with a timestamp, and writes it to the log file.
// The log file is stored in a directory named "log" within the same directory as this module.
// This modular approach allows for easy updates or changes to the logging logic without affecting other parts of the application.
// The log file can be rotated or managed separately to prevent it from growing indefinitely.
// The utility can be used in both development and production environments,
// providing a consistent way to log messages across different stages of the application lifecycle.

/////////////////////////////////////////////////
// [REQUIRE] fs
/////////////////////////////////////////////////
// This module provides an API for interacting with the file system.
// It allows you to read, write, and manipulate files and directories.
// In this context, it is used to write log messages to a file.
const fs = require("fs");

/////////////////////////////////////////////////
// [REQUIRE] path
/////////////////////////////////////////////////
const path = require("path");
// This module provides utilities for working with file and directory paths.
// It is used to construct the path to the log file, ensuring that the file is created in the correct directory regardless of the operating system.
// This is important for maintaining a consistent logging structure across different environments.

///////////////////////////////////////////////////
// getTimestamp
///////////////////////////////////////////////////
// This function generates a timestamp in the format [dd/mm/yyyy - hh:mm:ss].
// It is used to prepend each log message with a timestamp, providing context for when the log message was created.
// The timestamp is formatted to ensure that single-digit days, months, hours, minutes, and seconds are padded with a leading zero for consistency.
// This makes it easier to read and parse the log messages, especially when reviewing logs over time.
///////////////////////////////////////////////////
function getTimestamp() {
  const now = new Date();

  const options = {
    timeZone: "Europe/Rome",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };

  const localeParts = new Intl.DateTimeFormat("it-IT", options).formatToParts(now);

  const getPart = (type) =>
    localeParts.find((part) => part.type === type)?.value || "??";

  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  return `[${day}/${month}/${year} - ${hour}:${minute}:${second}]`;
}

///////////////////////////////////////////////////
// Write
///////////////////////////////////////////////////
// This function writes a log message to a specified file.
// It constructs the file path using the provided file name and the current timestamp.
// The log messages are stored in a directory named "log" within the same directory as this module.
// The function checks if the log directory exists, and if not, it creates it.
// The log messages are appended to the file, ensuring that previous logs are not overwritten.
function Write(fileName, text) {
  const logDir = path.join(__dirname, "logs");
  const filePath = path.join(logDir, `${fileName}.log`);
  const message = `${getTimestamp()} - ${text}\n`;

  // Assicurati che la directory esista
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    //console.log(`Directory di log creata: ${logDir}`);
  }

  // Scrive o appende il messaggio
  fs.appendFile(filePath, message, (err) => {
    //console.log(`Log scritto su file: ${filePath}`);
    if (err) {
      console.error("❌ Errore nella scrittura log su file:", err);
    }
  });
}

///////////////////////////////////////////////////
// wabuFileLogAdmin
///////////////////////////////////////////////////
// This function is a wrapper around the Write function specifically for admin logs.
function wabuFileLogAdmin(text) {
  Write("logs_admin", text);
}
///////////////////////////////////////////////////
// wabuFileLogMongo
///////////////////////////////////////////////////
// This function is a wrapper around the Write function specifically for MongoDB logs.
function wabuFileLogMongo(text) {
  Write("logs_mongo", text);
}
///////////////////////////////////////////////////
// wabuFileLogRoute
///////////////////////////////////////////////////
// This function is a wrapper around the Write function specifically for route logs.
function wabuFileLogRoute(text) {
  Write("logs_route", text);
}
///////////////////////////////////////////////////
// wabuFileLogServer
///////////////////////////////////////////////////
// This function is a wrapper around the Write function specifically for server logs.
function wabuFileLogServer(text) {
  Write("logs_server", text);
}

//################################################
// EXPORTS
//################################################
module.exports = {
    Write,
    wabuFileLogAdmin,
    wabuFileLogMongo,
    wabuFileLogRoute,
    wabuFileLogServer
};
