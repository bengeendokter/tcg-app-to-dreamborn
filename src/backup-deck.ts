import { getAllCards } from "./all-cards";
import { getDreambornDeck } from "./dreamborn-deck";
import { fetchJson } from "./fetch-json";
import { parseUrlId } from "./parse-url-id";
import type { AllCards } from "./types/all-cards";
import type { DreambornDeck } from "./types/dreamborn";
import { isUserDataDeck } from "./types/user-data";

export async function backupDeck(deckUrl: string): Promise<DreambornDeck> {
    const deckId: string = parseUrlId(deckUrl);
    const apiDeckUrl = `https://sharing.lorcana.ravensburger.com/deck/${deckId}.json` as const;

    // get allCards.json
    const allCards: AllCards = await getAllCards();

    // fetch deck from backup URL
    const userDataDeck: object = await fetchJson(apiDeckUrl);

    // check if userDataDeck is of correct type
    if (!isUserDataDeck(userDataDeck)) {
        throw Error(`Parsed object is not of type UserDataDeck`);
    }

    return getDreambornDeck(allCards, userDataDeck, 'shared-deck');
}