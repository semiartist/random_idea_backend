const express = require('express');

const port = 5000;

const app = express();

ideas = [
	{
		id: 1,
		text: 'make some software to automatically genera ideas',
		tag: 'software',
		username: 'brucebanner',
		date: '2022-01-02',
	},
];

app.get('/', (req, res) => {
	res.send('hello world');
});

// get all ideas
app.get('/api/ideas', (req, res) => {
	res.json({ success: true, data: idea });
});

app.get('/api/ideas/:id', (req, res) => {
	const idea = ideas.find((idea) => idea.id === +req.params.id);
	if (!idea) {
		return res
			.status(404)
			.json({ success: false, error: 'idea not found' });
	} else {
		res.json({ success: true, data: idea });
	}
});

app.listen(port, () => console.log(port));
