import * as fs from 'fs';
import { getAllCards } from "./all-cards";
import { getDreambornDeck } from "./dreamborn-deck";
import { fetchJson } from "./fetch-json";
import { parseUrlId } from "./parse-url-id";
import type { AllCards } from "./types/all-cards";
import type { DreambornDeck } from "./types/dreamborn";
import { isUserDataDeck } from "./types/user-data";

const OUTPUT_DIR = "./output" as const;

export async function backupDeck(inputDeckUrl: string): Promise<void> {
    const deckId: string = parseUrlId(inputDeckUrl);
    const deckUrl = `https://sharing.lorcana.ravensburger.com/deck/${deckId}.json` as const;

    // get allCards.json
    const allCards: AllCards = await getAllCards();

    // fetch deck from backup URL
    const userDataDeck: object = await fetchJson(deckUrl);

    // check if userDataDeck is of correct type
    if (!isUserDataDeck(userDataDeck)) {
        throw Error(`Parsed object is not of type UserDataDeck`);
    }

    // create shared-deck.txt file
    const dreambornDeck: DreambornDeck = getDreambornDeck(allCards, userDataDeck, 'shared-deck');
    const deckFileName = `${OUTPUT_DIR}/${dreambornDeck.name}.txt`;
    fs.writeFileSync(deckFileName, dreambornDeck.cards.map(card => [card.count, card.fullName].join(' ')).join('\n'), { encoding: 'utf-8' });

}