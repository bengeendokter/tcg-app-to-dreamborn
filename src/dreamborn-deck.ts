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

        if (cardCodeListString.length % 2 !== 0) {
            throw Error(`Invalid deck code: ${cardCodeListString}. It should have an even number of characters.`);
        }

        // Split the string into codes of two characters
        const cardCodeList: string[] = cardCodeListString.match(/.{1,2}/g) || [];

        const countedCardCodeList: CountedCardCode[] = cardCodeList.reduce((acc: CountedCardCode[], cardCode: string) => {
            const existingCard: CountedCardCode | undefined = acc.find(item => item.cardCode === cardCode);

            if (!existingCard) {
                return [...acc, { cardCode, count: 0 }];
            }

            const listWithoutExistingCard: CountedCardCode[] = acc.filter(item => item.cardCode !== cardCode);

            return [...listWithoutExistingCard, { ...existingCard, count: existingCard.count + 1 }];
        }, []);

        const cards: DreambornDeckCard[] = countedCardCodeList
            .map((countedCardCode: CountedCardCode) => {
                const card: Card | undefined = allCards.cards.find(card => card.code === countedCardCode.cardCode);

                return { countedCardCode, card };
            })
            .filter((cardCodeResult): cardCodeResult is {
                countedCardCode: CountedCardCode;
                card: Card;
            } => {
                if (cardCodeResult.card === undefined) {
                    console.warn(`Card with code ${cardCodeResult.countedCardCode.cardCode} not found in allCards`);
                    return false;
                }

                return true;
            })
            .map(({ countedCardCode, card }) => {
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
