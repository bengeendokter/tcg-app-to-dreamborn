import { AllCards } from '../model/all-cards.js';
import { DreambornCollectionCard } from '../model/dreamborn.js';
import { UserData } from '../model/user-data.js';

declare function getDreambornCollection(allCards: AllCards, userData: UserData): DreambornCollectionCard[];

export { getDreambornCollection };
