import { getAllCards } from "./all-cards";
import { fetchJson } from "./fetch-json";
import { parseUrlId } from "./parse-url-id";
import type { AllCards } from "./types/all-cards";

// TODO add individual deck link input option
export async function backupDeck(inputDeckUrl: string): Promise<void> {
    const deckId: string = parseUrlId(inputDeckUrl);
    const deckUrl = `https://sharing.lorcana.ravensburger.com/deck/${deckId}.json` as const;

    // get allCards.json
    const allCards: AllCards = await getAllCards();

    // fetch deck from backup URL
    const deckData: object = await fetchJson(deckUrl);
}