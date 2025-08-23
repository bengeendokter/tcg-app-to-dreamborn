export const MODE = {
    COLLECTION: 'collection',
    DECK: 'deck'
} as const;
export type Mode = (typeof MODE)[keyof typeof MODE];