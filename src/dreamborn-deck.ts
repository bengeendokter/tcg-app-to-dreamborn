import type { AllCards, Card } from "./types/all-cards";
import type { DreambornDeck, DreambornDeckCard } from "./types/dreamborn";
import type { UserData, UserDataDeck } from "./types/user-data";

interface CountedCardCode {
    cardCode: string;
    count: number;
}

export function getDreambornDeckList(allCards: AllCards, userData: UserData): DreambornDeck[] {
    const userDataDecks: UserDataDeck[] = userData.Decks;
    let allNotFoundCardCodes: Set<string> = new Set();

    const dreambornDecks: DreambornDeck[] = userDataDecks.map((userDataDeck: UserDataDeck, index: number) => {
        const autoNameNumber: number = userDataDeck.AutoNameNumber ?? (index + 1);
        const name: string = autoNameNumber.toString();
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

        let notFountdCardCodes: Set<string> = new Set();

        const cards: DreambornDeckCard[] = countedCardCodeList
            .map((countedCardCode: CountedCardCode) => {
                const card: Card | undefined = allCards.cards.find(card => card.code === countedCardCode.cardCode);

                return { countedCardCode, card };
            })
            .filter((cardCodeResult): cardCodeResult is {
                countedCardCode: CountedCardCode;
                card: Card;
            } => {
                const { card, countedCardCode } = cardCodeResult;

                if (card === undefined) {
                    notFountdCardCodes.add(countedCardCode.cardCode);
                    return false;
                }

                return true;
            })
            .map(({ countedCardCode, card }) => {
                return {
                    count: countedCardCode.count + 1,
                    fullName: card.fullName
                };
            });

        if (notFountdCardCodes.size > 0) {
            console.warn(`In deck "${name}" the following card codes could not be found: ${[...notFountdCardCodes].join(', ')}`);
            allNotFoundCardCodes = allNotFoundCardCodes.union(notFountdCardCodes);
        }

        return {
            name,
            cards
        };
    });

    if (allNotFoundCardCodes.size > 0) {
        console.warn(`These are all the card codes that could not be found: ${[...allNotFoundCardCodes].join(', ')}`);
    }

    return dreambornDecks;
}
