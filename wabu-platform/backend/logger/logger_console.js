//################################################
// logger_console.js
//################################################

/////////////////////////////////////////////////
// [REQUIRE] chalk
/////////////////////////////////////////////////
// This module provides a simple logging utility that formats log messages with colors and caller file information.
// It uses the `chalk` library for color formatting and extracts the caller file information from the stack trace.
// The log levels are info, warn, and error, each with a different color and format.
///////////////////////////////////////////////////
const wabuChalk = require("chalk");


/////////////////////////////////////////////////
// [REQUIRE] emojiSet
/////////////////////////////////////////////////
// This module defines a set of emojis used for logging and categorizing messages in the application.
// Each emoji corresponds to a specific type of message or action, making it easier to identify the context of the log messages.
// The emojis are used in conjunction with the logger utility to provide visual cues in the console output.
// This can help developers and administrators quickly understand the nature of the logs without needing to read the entire message.
// The emojis are categorized by their purpose, such as information, success, warning, error, and various application-specific actions.
// This modular approach allows for easy updates or additions to the emoji set as the application evolves or new features are added.
// The emojis can be used in both development and production environments, providing a consistent logging experience across different stages of the application lifecycle.
///////////////////////////////////////////////////
const emoji = require("../emoji/emojiSet");
const emojiSet = require("../emoji/emojiSet");

///////////////////////////////////////////////////
// Function to get the caller file from the stack trace
///////////////////////////////////////////////////
// This function extracts the file name of the caller from the stack trace.
// It uses a regular expression to match the file path in the stack trace.
// The caller file is used to provide context in the log messages, indicating where the log was generated.
///////////////////////////////////////////////////
function getCallerFile() {
  const stack = new Error().stack.split("\n");
  const callerLine = stack[3] || "unknown";
  const match = callerLine.match(/\((.*):\d+:\d+\)/);
  return match ? match[1] : "unknown file";
}

///////////////////////////////////////////////////
// Logger utility object
///////////////////////////////////////////////////
// This object provides methods for logging messages at different levels: info, warn, and error.
// Each method formats the message with a specific color and includes the caller file information.
///////////////////////////////////////////////////
const wabuConsoleLog = {
  info: (message) => {
    console.log(
      wabuChalk.blue(`${emojiSet.info}  [INFO]`) +
        wabuChalk.gray(` (${getCallerFile()})`) +
        " - " +
        wabuChalk.white(message)
    );
  },
  warn: (message) => {
    console.log(
      wabuChalk.yellow(`${emojiSet.warn} [WARN]`) +
        wabuChalk.gray(` (${getCallerFile()})`) +
        " - " +
        wabuChalk.white(message)
    );
  },
  error: (message) => {
    console.log(
      wabuChalk.red(`${emojiSet.error} [ERROR]`) +
        wabuChalk.gray(` (${getCallerFile()})`) +
        " - " +
        wabuChalk.white(message)
    );
  },
  admin: (message) => {
    console.log(
      wabuChalk.red(`${emojiSet.admin} [ADMIN]`) +
        wabuChalk.gray(` (${getCallerFile()})`) +
        " - " +
        wabuChalk.white(message)
    );
  },
  success: (message) => {
    console.log(
      wabuChalk.red(`${emojiSet.success} [SUCCESS]`) +
        wabuChalk.gray(` (${getCallerFile()})`) +
        " - " +
        wabuChalk.white(message)
    );
  },
};

//################################################
// EXPORTS
//################################################
module.exports = wabuConsoleLog;
