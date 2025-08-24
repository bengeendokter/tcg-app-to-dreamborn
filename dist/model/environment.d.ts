declare const CONFIG: {
    readonly DEFAULT_DATA_DIRECTORY: "./data";
    readonly DEFAULT_OUTPUT_DIRECTORY: "./output";
    readonly ALL_CARDS_URL: "https://lorcanajson.org/files/current/en/allCards.json";
    readonly ALL_CARDS_PATH: "./data/allCards.json";
    readonly USING_BACKUP_URL: true;
    readonly USER_DATA_PATH: "./data/userdata.json";
    readonly EXCLUDED_SET_NUMBERS: readonly ["Q1"];
};

export { CONFIG };
