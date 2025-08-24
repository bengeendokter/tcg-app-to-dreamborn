declare const USER_DATA_CARD_TYPE: {
    readonly REGULAR: "Regular";
    readonly FOILED: "Foiled";
};
type UserDataCardType = typeof USER_DATA_CARD_TYPE[keyof typeof USER_DATA_CARD_TYPE];
interface UserDataCard {
    Id: number;
    Type: UserDataCardType;
    Quantity: number;
}
interface UserDataDeck {
    AutoNameNumber?: number;
    DeckCode: string;
}
interface UserData {
    OwnedCardQuantitiesV2: UserDataCard[];
    Decks: UserDataDeck[];
}
declare function isUserDataDeck(object: object): object is UserDataDeck;
declare function isUserData(object: object): object is UserData;

export { USER_DATA_CARD_TYPE, type UserData, type UserDataCard, type UserDataCardType, type UserDataDeck, isUserData, isUserDataDeck };
