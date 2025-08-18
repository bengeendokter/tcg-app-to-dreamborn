# Lorcana TCG to Dreamborn
Extract data from the [Android Disney Lorcana TCG Companion app](https://play.google.com/store/apps/details?id=com.ravensburger.disney.lorcana&hl=nl) and generate collection and deck files to import into [dreamborn.ink](https://dreamborn.ink).

## Installation
1. Instal node.js
2. Install pnpm
3. Clone this repo
4. Run `pnpm install`

## Run program
1. Replace `data/userdata.json` with your own file from `Android/data/com.ravensburger.disney.lorcana/files/userdata.json`
2. Update `data/allCards.json` with the [latest version](https://lorcanajson.org/files/current/en/allCards.json)
3. Run `pnpm start` in the terminal

## Reference files
- https://lorcanajson.org/files/current/en/allCards.json
- https://dreamborn.ink/bulk_add_sample.csv