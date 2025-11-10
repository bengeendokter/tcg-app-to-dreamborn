import { getAllCards } from "./data-access/all-cards";
import { getDreambornDeck } from "./feature/dreamborn-deck";
import { fetchJson } from "./data-access/fetch-json";
import { parseUrlId } from "./util/parse-url-id";
import type { AllCards } from "./model/all-cards";
import type { DreambornDeck } from "./model/dreamborn";
import { isUserDataDeck } from "./model/user-data";

interface SetCard {
    name: string;
    localId: number;
    setName: string;
}

type Type = 'Grass' | 'Fire' | 'Water' | 'Lightning' | 'Psychic' | 'Darkness' | 'Metal' | 'Fairy';
type EnergyCard = `Basic_${Type}_Energy`;

interface CardWithQuantity {
    card: SetCard | EnergyCard;
    quantity: number;
}

interface Deck {
    cards: CardWithQuantity[];
}


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