export interface Card {
    id: number;
    number: number;
    setCode: string;
    code: string;
    fullName: string;
}

export interface AllCards {
    cards: Card[];
}

export function isAllCards(object: object): object is AllCards {
    // TODO implement type checking logic for AllCards
    return true;
}