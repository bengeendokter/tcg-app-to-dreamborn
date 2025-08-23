export const USER_DATA_CARD_TYPE = {
    REGULAR: "Regular",
    FOILED: "Foiled"
} as const;

export type UserDataCardType = typeof USER_DATA_CARD_TYPE[keyof typeof USER_DATA_CARD_TYPE];

export interface UserDataCard {
    Id: number;
    Type: UserDataCardType;
    Quantity: number;
}

export interface UserDataDeck {
    AutoNameNumber: number;
    DeckCode: string;
}

export interface UserData {
    OwnedCardQuantitiesV2: UserDataCard[]
    Decks: UserDataDeck[];
}

function isUserDataCardType(string: string): string is UserDataCardType {
    const validTypes: string[] = Object.values(USER_DATA_CARD_TYPE);
    return validTypes.includes(string);
}

function isUserDataCard(object: object): object is UserDataCard {
    if (!('Id' in object) || typeof object.Id !== 'number') {
        return false;
    }

    if (!('Type' in object) || typeof object.Type !== 'string') {
        return false;
    }

    const type: string = object.Type;
    if (!isUserDataCardType(type)) {
        return false;
    }

    if (!('Quantity' in object) || typeof object.Quantity !== 'number') {
        return false;
    }

    return true;
}

function isUserDataDeck(object: object): object is UserDataDeck {
    if (!('AutoNameNumber' in object) || typeof object.AutoNameNumber !== 'number') {
        return false;
    }

    if (!('DeckCode' in object) || typeof object.DeckCode !== 'string') {
        return false;
    }

    return true;
}

export function isUserData(object: object): object is UserData {
    if (!('OwnedCardQuantitiesV2' in object && 'Decks' in object)) {
        return false;
    }

    const ownedCardQuantitiesV2: unknown = object.OwnedCardQuantitiesV2;
    const decks: unknown = object.Decks;

    if (!(Array.isArray(ownedCardQuantitiesV2) && Array.isArray(decks))) {
        return false;
    }

    if (!ownedCardQuantitiesV2.every((userDataCard): userDataCard is object => typeof userDataCard === 'object' && userDataCard !== null)) {
        return false;
    }

    if (!decks.every((userDataDeck): userDataDeck is object => typeof userDataDeck === 'object' && userDataDeck !== null)) {
        return false;
    }

    const isValidOwnedCardQuantitiesV2: boolean = ownedCardQuantitiesV2.every(userDataCard => isUserDataCard(userDataCard));
    const isValidDecks: boolean = decks.every(userDataDeck => isUserDataDeck(userDataDeck));

    return isValidOwnedCardQuantitiesV2 && isValidDecks;
}