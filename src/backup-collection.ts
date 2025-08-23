import type { AllCards } from './types/all-cards';
import { isUserData } from './types/user-data';
import type { DreambornCollectionCard, DreambornDeck } from './types/dreamborn';
import { getDreambornCollection } from './dreamborn-collection';
import { getDreambornDeckList } from './dreamborn-deck';
import { importJson } from './import-json';
import { fetchJson } from './fetch-json';
import { parseUrlId } from './parse-url-id';
import { getAllCards } from './all-cards';

const USING_BACKUP_URL = true as const;
const USER_DATA_PATH = "./data/userdata.json" as const;

export async function backupCollection(backupUrl: string): Promise<{ collection: DreambornCollectionCard[], decks: DreambornDeck[] }> {
    const backupId: string = parseUrlId(backupUrl);
    const apiBackupUrl = `https://sharing.lorcana.ravensburger.com/backup/${backupId}.json` as const;

    // get allCards.json
    const allCards: AllCards = await getAllCards();

    // fetch or import userdata.json
    let userData: object;

    if (USING_BACKUP_URL) {
        // fetch userdata.json from backup URL
        userData = await fetchJson(apiBackupUrl);
    }
    else {
        // import userdata.json
        userData = importJson(USER_DATA_PATH);
    }

    // check if userdata.json is of correct type
    if (!isUserData(userData)) {
        throw Error(`Parsed object is not of type UserData`);
    }

    const collection: DreambornCollectionCard[] = getDreambornCollection(allCards, userData);
    const decks: DreambornDeck[] = getDreambornDeckList(allCards, userData);

    return { collection, decks };
}