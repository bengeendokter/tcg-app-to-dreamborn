declare const MODE: {
    readonly COLLECTION: "collection";
    readonly DECK: "deck";
};
type Mode = (typeof MODE)[keyof typeof MODE];

export { MODE, type Mode };
