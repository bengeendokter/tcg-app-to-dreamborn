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

export function isAllCards(object: any): object is AllCards {
    // TODO implement type checking logic for AllCards
    return true;
}