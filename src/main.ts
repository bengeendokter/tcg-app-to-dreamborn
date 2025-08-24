import * as fs from 'fs';
import { backupCollection } from './backup-collection';
import { backupDeck } from './backup-deck';
import type { DreambornCollectionCard, DreambornDeck } from './model/dreamborn';
import { MODE, type Mode } from './model/mode';
import { CONFIG } from './model/environment';

const deckUrl: string = 'https://www.disneylorcana.com/sharing/deck?id=897ce782-f5a7-4fdb-845e-1a89aafdd369';
const backupUrl: string = 'https://www.disneylorcana.com/sharing/backup?id=7fcf9ad0-eac2-4a11-9b00-07802471e7d4';
const outputDirectory: string = CONFIG.DEFAULT_OUTPUT_DIRECTORY;
const mode: Mode = MODE.DECK;

async function main(): Promise<void> {
    switch (mode) {
        case MODE.COLLECTION:
            const { collection, decks }: { collection: DreambornCollectionCard[], decks: DreambornDeck[] } = await backupCollection(backupUrl);

            // create collection.csv file
            const collectionHeader = "Set Number,Card Number,Variant,Count";
            fs.writeFileSync(`${outputDirectory}/collection.csv`, [collectionHeader, ...collection.map(card => [card.setNumber, card.cardNumber, card.variant, card.count].join(', '))].join('\n'), { encoding: 'utf-8' });

            // create all deck.txt files
            decks.forEach(deck => {
                const deckFileName = `${outputDirectory}/deck-${deck.name}.txt`;
                fs.writeFileSync(deckFileName, deck.cards.map(card => [card.count, card.fullName].join(' ')).join('\n'), { encoding: 'utf-8' });
            });
            return;

        case MODE.DECK:
            const dreambornDeck: DreambornDeck = await backupDeck(deckUrl);

            // create shared-deck.txt file
            const deckFileName = `${outputDirectory}/${dreambornDeck.name}.txt`;
            fs.writeFileSync(deckFileName, dreambornDeck.cards.map(card => [card.count, card.fullName].join(' ')).join('\n'), { encoding: 'utf-8' });
            return;

        default:
            mode satisfies never;
            throw Error(`Invalid mode: ${mode}`);
    }
}

await main();