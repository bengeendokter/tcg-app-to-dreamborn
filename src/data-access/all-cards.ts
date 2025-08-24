import { fetchJson } from "./fetch-json";
import { importJson } from "./import-json";
import { isAllCards, type AllCards } from "../model/all-cards";
import { CONFIG } from "../model/environment";

export async function getAllCards(): Promise<AllCards> {
    // get allCards.json
    let allCards: object;

    try {
        // try to fetch the newest allCards.json
        allCards = await fetchJson(CONFIG.ALL_CARDS_URL);
    }
    catch {
        // if the fetch fails, use the local version
        console.warn(`Warning: Fetching ${CONFIG.ALL_CARDS_URL} failed. Using local version at ${CONFIG.ALL_CARDS_PATH}`);
        allCards = importJson(CONFIG.ALL_CARDS_PATH);
    }

    // check if allCards.json is of correct type
    if (!isAllCards(allCards)) {
        throw Error(`Parsed object is not of type AllCards`);
    }

    return allCards;
}