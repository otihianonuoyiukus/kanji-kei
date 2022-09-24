const { getKanjiList } = require("../src/characters");

const kanjiList = async () => { return await getKanjiList() };

async function getKanjiInfo(kanji) {
	let test;
	await kanjiList()
	.then((list) => 
		list.find(x => x.kanji === kanji))
	.then((j) => 
		{test = j;});
	// console.log(test);
	return test;
}

module.exports = { getKanjiInfo };