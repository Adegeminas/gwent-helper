export type Card = {
    name: string;
    prov?: number;
    echo?: boolean;
    gold?: boolean;
    category?: string;
    fraction?: string;

    played?: boolean;
    echoed?: boolean;
    unknown?: boolean;
}

export type Deck = {
    name: string
    cards: Card[]
}