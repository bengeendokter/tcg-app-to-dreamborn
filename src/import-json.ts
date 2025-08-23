import * as fs from 'fs';

export function importJson(filePath: string): object {
    let importedJson: string;

    try {
        importedJson = fs.readFileSync(filePath, { encoding: 'utf-8' });
    }
    catch (error) {
        throw Error(`Failed to read ${filePath}`);
    }

    let object: unknown;

    try {
        object = JSON.parse(importedJson);
    }
    catch (error) {
        throw Error(`Format of ${filePath} is not valid JSON`);
    }

    if (typeof object !== 'object' || object === null) {
        throw Error(`Parsed ${filePath} is not an object`);
    }

    return object;
}