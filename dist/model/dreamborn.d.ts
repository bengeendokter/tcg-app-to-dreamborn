declare const DREAMBRON_COLLECTION_CARD_VARIANT: {
    readonly NORMAL: "normal";
    readonly FOIL: "foil";
};
type DreambornCollectionCardVariant = typeof DREAMBRON_COLLECTION_CARD_VARIANT[keyof typeof DREAMBRON_COLLECTION_CARD_VARIANT];
interface DreambornCollectionCard {
    setNumber: number;
    cardNumber: number;
    variant: DreambornCollectionCardVariant;
    count: number;
}
interface DreambornDeckCard {
    count: number;
    fullName: string;
}
interface DreambornDeck {
    name: string;
    cards: DreambornDeckCard[];
}

export { DREAMBRON_COLLECTION_CARD_VARIANT, type DreambornCollectionCard, type DreambornCollectionCardVariant, type DreambornDeck, type DreambornDeckCard };
