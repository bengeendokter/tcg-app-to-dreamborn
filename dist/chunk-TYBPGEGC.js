// src/model/environment.ts
var DEFAULT_DATA_DIRECTORY = "./data";
var CONFIG = {
  DEFAULT_DATA_DIRECTORY,
  DEFAULT_OUTPUT_DIRECTORY: "./output",
  ALL_CARDS_URL: "https://lorcanajson.org/files/current/en/allCards.json",
  ALL_CARDS_PATH: `${DEFAULT_DATA_DIRECTORY}/allCards.json`,
  USING_BACKUP_URL: true,
  USER_DATA_PATH: `${DEFAULT_DATA_DIRECTORY}/userdata.json`,
  EXCLUDED_SET_NUMBERS: ["Q1"]
};

export {
  CONFIG
};
