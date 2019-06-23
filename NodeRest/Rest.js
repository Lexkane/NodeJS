const express = require('express');
const moment = require('moment');
const parser = require('body-parser');
const db = require('./models');
const app = express();

app.use(parser.json());

app.use(async (req, res, next) => {
	if (req.headers.authorization !== '123abc') {
		return res.status(401).send();
	}
	next();
});

app.get('/api/v1/authors', async (req, res) => {
	let authors = await db.authors.find_all();
	return res.status(200).send(authors);
});

app.get('/api/v1/authors/:author_id', async (req, res) => {
	const author_id = req.params.author_id;
	let author = await db.authors.find_one({
		where: {
			author_id
		}
	});
	if (!author) {
		return res.status(400).send();
	}
	return res.status(200).send(author);
});

app.post('/api/v1/authors', async (req, res) => {
	const { name } = req.body;
	let author = await db.authors.create({
		name,
		created_at: moment().format()
	});

	return res.status(201).send(author);
});

app.listen(9000);
