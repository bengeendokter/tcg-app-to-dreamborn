# TCG App to Dreamborn
Extract data from the TCG Companion app links and generate collection and deck files to import into [dreamborn.ink](https://dreamborn.ink).

## Local installation
1. Instal node.js
2. Install pnpm
3. Clone this repo
4. Run `pnpm install` in the terminal while in the repo folder

## Run program with userdata.json file
Instead of using the backup/share links, you can extract the local data from the Android app and run this program.
1. Replace `data/userdata.json` with your own file from `Android/data/com.ravensburger.disney.lorcana/files/userdata.json`
2. Update `data/allCards.json` with the [latest version](https://lorcanajson.org/files/current/en/allCards.json) if you want to be able to use the program offline
3. Update `USING_BACKUP_URL` in `src\backup-collection.ts` to `false`
4. Run `pnpm start` in the terminal
