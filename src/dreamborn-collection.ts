import type { AllCards, Card } from "./types/all-cards";
import { DREAMBRON_COLLECTION_CARD_VARIANT, type DreambornCollectionCard, type DreambornCollectionCardVariant } from "./types/dreamborn";
import { USER_DATA_CARD_TYPE, type UserData, type UserDataCard, type UserDataCardType } from "./types/user-data";

const EXCLUDED_SET_NUMBERS = ["Q1"] as const;

function userDataTypeToDreambornVariant(userDataType: UserDataCardType): DreambornCollectionCardVariant {
    switch (userDataType) {
        case USER_DATA_CARD_TYPE.REGULAR:
            return DREAMBRON_COLLECTION_CARD_VARIANT.NORMAL;
        case USER_DATA_CARD_TYPE.FOILED:
            return DREAMBRON_COLLECTION_CARD_VARIANT.FOIL;
        default:
            userDataType satisfies never;
            throw Error(`Unknown UserDataCardType: ${userDataType}`);
    }
}

export function getDreambornCollection(allCards: AllCards, userData: UserData): DreambornCollectionCard[] {
    const userDataCards: UserDataCard[] = userData.OwnedCardQuantitiesV2;

    return userDataCards
        .map((userDataCard: UserDataCard) => {
            const card: Card | undefined = allCards.cards.find(card => card.id === userDataCard.Id);

            if (!card) {
                throw Error(`Card with ID ${userDataCard.Id} not found in allCards`);
            }

            return {userDataCard, card};
        })
        .filter(({card}) => {
            const filteredOutSetNumbers: string[] = Array.from(EXCLUDED_SET_NUMBERS);
            return !filteredOutSetNumbers.includes(card.setCode);
        })
        .map(({userDataCard, card}) => {
            const variant: DreambornCollectionCardVariant = userDataTypeToDreambornVariant(userDataCard.Type);

            const setNumber: number = Number(card.setCode);

            if (isNaN(setNumber)) {
                throw Error(`Invalid set number for card with ID ${userDataCard.Id}: ${card.setCode}`);
            }

            return {
                setNumber,
                cardNumber: card.number,
                variant,
                count: userDataCard.Quantity
            };
        });
}
