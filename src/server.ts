import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:4200',
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/deck', (request, response) => {
    const backupUrl: string = request.body.backupUrl;
    response.send({ deck: 'Sample Deck Data' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
