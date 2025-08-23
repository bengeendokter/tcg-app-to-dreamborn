import { fetchJson } from "./fetch-json";
import { importJson } from "./import-json";
import { isAllCards, type AllCards } from "./types/all-cards";

const ALL_CARDS_URL = 'https://lorcanajson.org/files/current/en/allCards.json' as const;
const ALL_CARDS_PATH = "./data/allCards.json" as const;

export async function getAllCards(): Promise<AllCards> {
    // get allCards.json
    let allCards: object;

    try {
        // try to fetch the newest allCards.json
        allCards = await fetchJson(ALL_CARDS_URL);
    }
    catch {
        // if the fetch fails, use the local version
        console.warn(`Warning: Fetching ${ALL_CARDS_URL} failed. Using local version at ${ALL_CARDS_PATH}`);
        allCards = importJson(ALL_CARDS_PATH);
    }

    // check if allCards.json is of correct type
    if (!isAllCards(allCards)) {
        throw Error(`Parsed object is not of type AllCards`);
    }

    return allCards;
}