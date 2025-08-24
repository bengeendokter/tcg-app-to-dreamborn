interface Card {
    id: number;
    number: number;
    setCode: string;
    code: string;
    fullName: string;
}
interface AllCards {
    cards: Card[];
}
declare function isAllCards(object: object): object is AllCards;

export { type AllCards, type Card, isAllCards };
