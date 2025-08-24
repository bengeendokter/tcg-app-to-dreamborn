import { DreambornDeck } from './model/dreamborn.js';

declare function backupDeck(deckUrl: string): Promise<DreambornDeck>;

export { backupDeck };
