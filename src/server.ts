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

// Custom middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`${new Date()} Received request`);
    // Check for CORS-related headers
    if (req.headers.origin) {
        console.log(`  Origin: ${req.headers.origin}`);
    }
    if (req.headers['access-control-request-method']) {
        console.log(`  CORS preflight request for method: ${req.headers['access-control-request-method']}`);
    }
    next();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/deck', async (request, response) => {
    try {
        console.log(`${new Date()} Received request on '/api/deck'`);

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
