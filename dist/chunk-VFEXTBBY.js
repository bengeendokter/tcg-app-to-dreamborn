// src/model/user-data.ts
var USER_DATA_CARD_TYPE = {
  REGULAR: "Regular",
  FOILED: "Foiled"
};
function isUserDataCardType(string) {
  const validTypes = Object.values(USER_DATA_CARD_TYPE);
  return validTypes.includes(string);
}
function isUserDataCard(object) {
  if (!("Id" in object) || typeof object.Id !== "number") {
    return false;
  }
  if (!("Type" in object) || typeof object.Type !== "string") {
    return false;
  }
  const type = object.Type;
  if (!isUserDataCardType(type)) {
    return false;
  }
  if (!("Quantity" in object) || typeof object.Quantity !== "number") {
    return false;
  }
  return true;
}
function isUserDataDeck(object) {
  if (!("DeckCode" in object) || typeof object.DeckCode !== "string") {
    return false;
  }
  if ("AutoNameNumber" in object && typeof object.AutoNameNumber !== "number") {
    return false;
  }
  return true;
}
function isUserData(object) {
  if (!("OwnedCardQuantitiesV2" in object && "Decks" in object)) {
    return false;
  }
  const ownedCardQuantitiesV2 = object.OwnedCardQuantitiesV2;
  const decks = object.Decks;
  if (!(Array.isArray(ownedCardQuantitiesV2) && Array.isArray(decks))) {
    return false;
  }
  if (!ownedCardQuantitiesV2.every((userDataCard) => typeof userDataCard === "object" && userDataCard !== null)) {
    return false;
  }
  if (!decks.every((userDataDeck) => typeof userDataDeck === "object" && userDataDeck !== null)) {
    return false;
  }
  const isValidOwnedCardQuantitiesV2 = ownedCardQuantitiesV2.every((userDataCard) => isUserDataCard(userDataCard));
  const isValidDecks = decks.every((userDataDeck) => isUserDataDeck(userDataDeck));
  return isValidOwnedCardQuantitiesV2 && isValidDecks;
}

export {
  USER_DATA_CARD_TYPE,
  isUserDataDeck,
  isUserData
};
