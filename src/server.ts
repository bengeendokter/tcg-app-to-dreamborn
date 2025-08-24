import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { backupDeck } from './backup-deck';
import type { DreambornDeck } from './model/dreamborn';

const app = express();
const port = 3000;

const corsOptions = {
    origin: ['http://localhost:4200', 'https://tcg-app-to-dreamborn.bengeendokter.be']
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/deck', async (request, response) => {
    try {
        const origin = request.get('origin');
        console.log(`${new Date()} Received request from origin: ${origin}`);

        const backupUrl: string = request.body.backupUrl;
        const dreambornDeck: DreambornDeck = await backupDeck(backupUrl);

        const deck: string = dreambornDeck.cards.map(card => [card.count, card.fullName].join(' ')).join('\n');
        response.send({ deck });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            response.status(500).send({ error: error.message });
            console.error(`${new Date()} Error processing request: ${error.message}`);
        } else {
            response.status(500).send({ error: 'An unknown error occurred' });
            console.error(`${new Date()} An unknown error occurred`);
        }
    }
});

app.listen(port, () => {
    console.log(`${new Date()} App listening on port ${port}`);
});
