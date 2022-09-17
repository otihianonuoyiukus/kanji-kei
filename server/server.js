const express = require("express");
const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

const assetsRouter = require("./assets-router");
app.use("/src/assets/svg/", express.static("src/assets/svg/"));
app.use("/public/", express.static("public/"));
app.use("/src/components", assetsRouter);

app.get("/api/v1/language-data/radical_data", (req, res) => {
	const results = [];
	fs.createReadStream('public/language-data/japanese-radicals.csv')
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {
		res.json({results});
	});
});

app.get("/api/v1/language-data/kanji_data", (req, res) => {
	const results = [];
	fs.createReadStream('public/language-data/ka_data.csv')
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {
		res.json({results});
	});
});

app.get("/", (_req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
	console.log();
	console.log(`  App running in port ${PORT}`);
	console.log();
	console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});