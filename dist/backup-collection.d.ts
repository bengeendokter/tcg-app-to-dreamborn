import { DreambornCollectionCard, DreambornDeck } from './model/dreamborn.js';

declare function backupCollection(backupUrl: string): Promise<{
    collection: DreambornCollectionCard[];
    decks: DreambornDeck[];
}>;

export { backupCollection };
