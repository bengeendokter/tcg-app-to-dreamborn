import { parseUrlId } from "./parse-url-id";

// TODO add individual deck link input option
export async function backupDeck(inputDeckUrl: string): Promise<void> {
    const deckId: string = parseUrlId(inputDeckUrl);
    const userDataUrl = `https://sharing.lorcana.ravensburger.com/deck/${deckId}.json` as const;

}