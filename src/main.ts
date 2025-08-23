import { backupCollection } from './backup-collection';
import { backupDeck } from './backup-deck';

const inputDeckUrl: string = 'https://www.disneylorcana.com/sharing/deck?id=897ce782-f5a7-4fdb-845e-1a89aafdd369';
const inputBackupUrl: string = 'https://www.disneylorcana.com/sharing/backup?id=7fcf9ad0-eac2-4a11-9b00-07802471e7d4';

const MODE = {
    COLLECTION: 'collection',
    DECK: 'deck'
} as const;
type Mode = (typeof MODE)[keyof typeof MODE];

const mode: Mode = MODE.COLLECTION;

async function main(): Promise<void> {
    switch (mode) {
        case MODE.COLLECTION:
            await backupCollection(inputBackupUrl);
            return;
        case MODE.DECK:
            await backupDeck(inputDeckUrl);
            return;
        default:
            mode satisfies never;
            throw Error(`Invalid mode: ${mode}`);
    }
}

await main();