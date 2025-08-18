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

export function isUserData(object: object): object is UserData {
    // TODO implement type checking logic for UserData
    return true;
}