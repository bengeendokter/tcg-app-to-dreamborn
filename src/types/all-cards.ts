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

function isCard(object: object): object is Card {
    if (!('id' in object) || typeof object.id !== 'number') {
        return false;
    }

    if (!('number' in object) || typeof object.number !== 'number') {
        return false;
    }

    if (!('setCode' in object) || typeof object.setCode !== 'string') {
        return false;
    }

    if (!('code' in object) || typeof object.code !== 'string') {
        return false;
    }

    if (!('fullName' in object) || typeof object.fullName !== 'string') {
        return false;
    }

    return true;
}

export function isAllCards(object: object): object is AllCards {
    if (!('cards' in object)) {
        return false;
    }

    const cards: unknown = object.cards;
    if(!Array.isArray(cards)) {
        return false;
    }

    if (!cards.every((card): card is object => typeof card === 'object' && card !== null)) {
        return false;
    }

    return cards.every(card => isCard(card));
}