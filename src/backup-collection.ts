import * as fs from 'fs';
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
const OUTPUT_DIR = "./output" as const;

export async function backupCollection(inputBackupUrl: string): Promise<void> {
    const backupId: string = parseUrlId(inputBackupUrl);
    const userDataUrl = `https://sharing.lorcana.ravensburger.com/backup/${backupId}.json` as const;

    // get allCards.json
    const allCards: AllCards = await getAllCards();

    // fetch or import userdata.json
    let userData: object;

    if (USING_BACKUP_URL) {
        // fetch userdata.json from backup URL
        userData = await fetchJson(userDataUrl);
    }
    else {
        // import userdata.json
        userData = importJson(USER_DATA_PATH);
    }

    // check if userdata.json is of correct type
    if (!isUserData(userData)) {
        throw Error(`Parsed object is not of type UserData`);
    }

    // create collection.csv file
    const dreambornCollection: DreambornCollectionCard[] = getDreambornCollection(allCards, userData);
    const collectionHeader = "Set Number,Card Number,Variant,Count";
    fs.writeFileSync(`${OUTPUT_DIR}/collection.csv`, [collectionHeader, ...dreambornCollection.map(card => [card.setNumber, card.cardNumber, card.variant, card.count].join(', '))].join('\n'), { encoding: 'utf-8' });

    // create all deck.txt files
    const dreambornDeckList: DreambornDeck[] = getDreambornDeckList(allCards, userData);
    dreambornDeckList.forEach(deck => {
        const deckFileName = `${OUTPUT_DIR}/deck-${deck.name}.txt`;
        fs.writeFileSync(deckFileName, deck.cards.map(card => [card.count, card.fullName].join(' ')).join('\n'), { encoding: 'utf-8' });
    });
}