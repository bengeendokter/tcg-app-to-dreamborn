export const DREAMBRON_COLLECTION_CARD_VARIANT = {
    NORMAL: "normal",
    FOIL: "foil"
} as const;

export type DreambornCollectionCardVariant = typeof DREAMBRON_COLLECTION_CARD_VARIANT[keyof typeof DREAMBRON_COLLECTION_CARD_VARIANT];

export interface DreambornCollectionCard {
    setNumber: number;
    cardNumber: number;
    variant: DreambornCollectionCardVariant;
    count: number;
}

export interface DreambornDeckCard {
    count: number;
    fullName: string;
}