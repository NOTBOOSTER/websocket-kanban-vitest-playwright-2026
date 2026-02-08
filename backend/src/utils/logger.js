import fs from "fs";
import path from "path";

const logLevels = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

const logFile = path.join("server.log");

const log = (level, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;

  console.log(logMessage.trim());

  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error("Failed to write to log file", err);
  });
};

const logger = {
  info: (msg) => log(logLevels.INFO, msg),
  warn: (msg) => log(logLevels.WARN, msg),
  error: (msg) => log(logLevels.ERROR, msg),
};

export default logger;
