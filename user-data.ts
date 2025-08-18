const USER_DATA_CARD_TYPE = {
    REGULAR: "Regular",
    FOILED: "Foiled"
} as const;

type UserDataCardType = typeof USER_DATA_CARD_TYPE[keyof typeof USER_DATA_CARD_TYPE];

interface UserDataCard {
    Id: number;
    Type: UserDataCardType;
    Quantity: number;
}

interface UserDataDeck {
    AutoNameNumber: number;
    DeckCode: string;
}

interface UserData {
    OwnedCardQuantitiesV2: UserDataCard[]
    Decks: UserDataDeck[];
}

export function isUserData(object: object): object is UserData {
    // TODO implement type checking logic for UserData
    return true;
}