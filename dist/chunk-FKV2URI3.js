// src/model/all-cards.ts
function isCard(object) {
  if (!("id" in object) || typeof object.id !== "number") {
    return false;
  }
  if (!("number" in object) || typeof object.number !== "number") {
    return false;
  }
  if (!("setCode" in object) || typeof object.setCode !== "string") {
    return false;
  }
  if (!("code" in object) || typeof object.code !== "string") {
    return false;
  }
  if (!("fullName" in object) || typeof object.fullName !== "string") {
    return false;
  }
  return true;
}
function isAllCards(object) {
  if (!("cards" in object)) {
    return false;
  }
  const cards = object.cards;
  if (!Array.isArray(cards)) {
    return false;
  }
  if (!cards.every((card) => typeof card === "object" && card !== null)) {
    return false;
  }
  return cards.every((card) => isCard(card));
}

export {
  isAllCards
};
