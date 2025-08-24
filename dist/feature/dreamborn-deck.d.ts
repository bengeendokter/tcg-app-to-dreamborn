import { AllCards } from '../model/all-cards.js';
import { DreambornDeck } from '../model/dreamborn.js';
import { UserDataDeck, UserData } from '../model/user-data.js';

declare function getDreambornDeck(allCards: AllCards, userDataDeck: UserDataDeck, name: string): DreambornDeck & {
    notFountdCardCodes: Set<string>;
};
declare function getDreambornDeckList(allCards: AllCards, userData: UserData): DreambornDeck[];

export { getDreambornDeck, getDreambornDeckList };
