const { getKanjiList } = require("../src/characters");

const kanjiList = async () => {
  return await getKanjiList();
};

async function getKanjiInfo(kanjiChar) {
  let kanji;
  await kanjiList()
    .then((list) => list.find((x) => x.kanji === kanjiChar))
    .then((match) => {
      kanji = match;
    });
  return kanji;
}

module.exports = { getKanjiInfo };
