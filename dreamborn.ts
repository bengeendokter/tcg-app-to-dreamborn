const DREAMBRON_COLLECTION_CARD_VARIANT = {
    NORMAL: "normal",
    FOIL: "foil"
} as const;

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