import { AllCards, Card } from "./types/all-cards";
import { DreambornDeck, DreambornDeckCard } from "./types/dreamborn";
import { UserData, UserDataDeck } from "./types/user-data";

interface CountedCardCode {
    cardCode: string;
    count: number;
}

export function getDreambornDeckList(allCards: AllCards, userData: UserData): DreambornDeck[] {
    const userDataDecks: UserDataDeck[] = userData.Decks;

    return userDataDecks.map((userDataDeck: UserDataDeck) => {
        const name: string = userDataDeck.AutoNameNumber.toString();
        const deckCode: string = userDataDeck.DeckCode;
        const cardCodeListString: string = deckCode.substring(1);

        if(cardCodeListString.length % 2 !== 0) {
            throw Error(`Invalid deck code: ${cardCodeListString}. It should have an even number of characters.`);
        }

        // Split the string into codes of two characters
        const cardCodeList: string[] = cardCodeListString.match(/.{1,2}/g) || [];

        const countedCardCodeList: CountedCardCode[] = cardCodeList.reduce((acc: CountedCardCode[], cardCode: string) => {
            // TODO
        }, []);

        const cards: DreambornDeckCard[] = countedCardCodeList.map((countedCardCode: CountedCardCode) => {
            const card: Card | undefined = allCards.cards.find(card => card.code === countedCardCode.cardCode);

            if (!card) {
                throw Error(`Card with code ${countedCardCode.cardCode} not found in allCards`);
            }

            return {
                count: countedCardCode.count,
                fullName: card.fullName
            };
        });

        return {
            name,
            cards
        };
    });
}
