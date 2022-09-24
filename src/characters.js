const csv = require("csv-parser");
const fs = require("fs");


function getKanjiList() {
	return new Promise((resolve) => {
		const resultKanji = [];
		fs.createReadStream('public/language-data/ka_data.csv')
		.pipe(csv())
		.on('data', (data) => resultKanji.push(data))
		.on('end', () =>  { resolve(resultKanji) });
	});
}

function getRadicalList() {
	return new Promise((resolve) => {
		const resultRadical = [];
		fs.createReadStream('public/language-data/japanese-radicals.csv')
		.pipe(csv())
		.on('data', (data) => resultRadical.push(data))
		.on('end', () =>  { resolve(resultRadical) });
	});
}

module.exports = { getKanjiList, getRadicalList };