// src/feature/dreamborn-deck.ts
function getDreambornDeck(allCards, userDataDeck, name) {
  const deckCode = userDataDeck.DeckCode;
  const cardCodeListString = deckCode.substring(1);
  if (cardCodeListString.length % 2 !== 0) {
    throw Error(`Invalid deck code: ${cardCodeListString}. It should have an even number of characters.`);
  }
  const cardCodeList = cardCodeListString.match(/.{1,2}/g) || [];
  const countedCardCodeList = cardCodeList.reduce((acc, cardCode) => {
    const existingCard = acc.find((item) => item.cardCode === cardCode);
    if (!existingCard) {
      return [...acc, { cardCode, count: 0 }];
    }
    const listWithoutExistingCard = acc.filter((item) => item.cardCode !== cardCode);
    return [...listWithoutExistingCard, { ...existingCard, count: existingCard.count + 1 }];
  }, []);
  let notFountdCardCodes = /* @__PURE__ */ new Set();
  const cards = countedCardCodeList.map((countedCardCode) => {
    const card = allCards.cards.find((card2) => card2.code === countedCardCode.cardCode);
    return { countedCardCode, card };
  }).filter((cardCodeResult) => {
    const { card, countedCardCode } = cardCodeResult;
    if (card === void 0) {
      notFountdCardCodes.add(countedCardCode.cardCode);
      return false;
    }
    return true;
  }).map(({ countedCardCode, card }) => {
    return {
      count: countedCardCode.count + 1,
      fullName: card.fullName
    };
  });
  if (notFountdCardCodes.size > 0) {
    console.warn(`In deck "${name}" the following card codes could not be found: ${[...notFountdCardCodes].join(", ")}`);
  }
  return {
    name,
    cards,
    notFountdCardCodes
  };
}
function getDreambornDeckList(allCards, userData) {
  const userDataDecks = userData.Decks;
  let allNotFoundCardCodes = /* @__PURE__ */ new Set();
  const dreambornDecks = userDataDecks.map((userDataDeck, index) => {
    const autoNameNumber = userDataDeck.AutoNameNumber ?? index + 1;
    const deckName = autoNameNumber.toString();
    const { notFountdCardCodes, ...dreambornDeck } = getDreambornDeck(allCards, userDataDeck, deckName);
    allNotFoundCardCodes = allNotFoundCardCodes.union(notFountdCardCodes);
    return dreambornDeck;
  });
  if (allNotFoundCardCodes.size > 0) {
    console.warn(`These are all the card codes that could not be found: ${[...allNotFoundCardCodes].join(", ")}`);
  }
  return dreambornDecks;
}

export {
  getDreambornDeck,
  getDreambornDeckList
};
