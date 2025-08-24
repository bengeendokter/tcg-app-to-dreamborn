import {
  DREAMBRON_COLLECTION_CARD_VARIANT
} from "./chunk-Y6YBLUTX.js";
import {
  USER_DATA_CARD_TYPE
} from "./chunk-VFEXTBBY.js";
import {
  CONFIG
} from "./chunk-TYBPGEGC.js";

// src/feature/dreamborn-collection.ts
function userDataTypeToDreambornVariant(userDataType) {
  switch (userDataType) {
    case USER_DATA_CARD_TYPE.REGULAR:
      return DREAMBRON_COLLECTION_CARD_VARIANT.NORMAL;
    case USER_DATA_CARD_TYPE.FOILED:
      return DREAMBRON_COLLECTION_CARD_VARIANT.FOIL;
    default:
      userDataType;
      throw Error(`Unknown UserDataCardType: ${userDataType}`);
  }
}
function getDreambornCollection(allCards, userData) {
  const userDataCards = userData.OwnedCardQuantitiesV2;
  return userDataCards.map((userDataCard) => {
    const card = allCards.cards.find((card2) => card2.id === userDataCard.Id);
    if (!card) {
      throw Error(`Card with ID ${userDataCard.Id} not found in allCards`);
    }
    return { userDataCard, card };
  }).filter(({ card }) => {
    const filteredOutSetNumbers = Array.from(CONFIG.EXCLUDED_SET_NUMBERS);
    return !filteredOutSetNumbers.includes(card.setCode);
  }).map(({ userDataCard, card }) => {
    const variant = userDataTypeToDreambornVariant(userDataCard.Type);
    const setNumber = Number(card.setCode);
    if (isNaN(setNumber)) {
      throw Error(`Invalid set number for card with ID ${userDataCard.Id}: ${card.setCode}`);
    }
    return {
      setNumber,
      cardNumber: card.number,
      variant,
      count: userDataCard.Quantity
    };
  });
}

export {
  getDreambornCollection
};
