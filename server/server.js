const express = require("express");
const path = require("path");
const { getKanjiList, getRadicalList } = require("../src/characters");
const { getKanjiInfo } = require("../src/kanji");

const app = express();

const assetsRouter = require("./assets-router");
app.use("/src/assets/svg/", express.static("src/assets/svg/"));
app.use("/public/", express.static("public/"));
app.use("/src/components", assetsRouter);


app.get("/api/v1/language-data/kanji_data", (req, res) => {
	getKanjiList().then(result => res.json(result));
});

app.get("/api/v1/language-data/radical_data", (req, res) => {
	getRadicalList().then(result => res.json(result));
});

//TODO: Handle error if kanji does not exist in the list
app.get("api/v1/kanji/:kanji", (req, res) => {
	getKanjiInfo(req.params.kanji).then(result => res.json(result));
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//TODO: This
// app.get("/kanji/:kanji", (req, res) => {

// });


const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
	console.log();
	console.log(`  App running in port ${PORT}`);
	console.log();
	console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});