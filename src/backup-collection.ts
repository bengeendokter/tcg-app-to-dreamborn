import type { AllCards } from './model/all-cards';
import { isUserData } from './model/user-data';
import type { DreambornCollectionCard, DreambornDeck } from './model/dreamborn';
import { getDreambornCollection } from './feature/dreamborn-collection';
import { getDreambornDeckList } from './feature/dreamborn-deck';
import { importJson } from './data-access/import-json';
import { fetchJson } from './data-access/fetch-json';
import { parseUrlId } from './util/parse-url-id';
import { getAllCards } from './data-access/all-cards';
import { CONFIG } from './model/environment';

export async function backupCollection(backupUrl: string): Promise<{ collection: DreambornCollectionCard[], decks: DreambornDeck[] }> {
    const backupId: string = parseUrlId(backupUrl);
    const apiBackupUrl = `https://sharing.lorcana.ravensburger.com/backup/${backupId}.json` as const;

    // get allCards.json
    const allCards: AllCards = await getAllCards();

    // fetch or import userdata.json
    let userData: object;

    if (CONFIG.USING_BACKUP_URL) {
        // fetch userdata.json from backup URL
        userData = await fetchJson(apiBackupUrl);
    }
    else {
        // import userdata.json
        userData = importJson(CONFIG.USER_DATA_PATH);
    }

    // check if userdata.json is of correct type
    if (!isUserData(userData)) {
        throw Error(`Parsed object is not of type UserData`);
    }

    const collection: DreambornCollectionCard[] = getDreambornCollection(allCards, userData);
    const decks: DreambornDeck[] = getDreambornDeckList(allCards, userData);

    return { collection, decks };
}