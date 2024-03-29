const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');

ideas = [
	{
		id: 1,
		text: 'make some software to automatically genera ideas',
		tag: 'software',
		username: 'brucebanner',
		date: '2022-01-02',
	},
];
// get all ideas
router.get('/', async (req, res) => {
	try {
		const ideas = await Idea.find();
		res.json({ success: true, data: ideas });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'check the server connection',
		});
	}
});

// get single idea
router.get('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);
		res.json({ success: true, data: idea });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'some other server error',
		});
	}
});

// add an idea
router.post('/', async (req, res) => {
	const idea = new Idea({
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
	});
	try {
		const savedIdea = await idea.save();
		res.json({ success: true, data: { savedIdea } });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'server error' });
	}
});

//update an idea
router.put('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);

		if (idea.username === req.body.username) {
			const updatedIdea = await Idea.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						text: req.body.text,
						tag: req.body.tag,
					},
				},
				{ new: true },
			);
			return res.json({ success: true, data: updatedIdea });
		}
		// username doesn't match
		res.status(403).json({
			success: false,
			error: 'you are not authorized to update this resource',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'some other server error',
		});
	}

	// res.send({ success: true, data: { idea } });
});

// delete a post
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const idea = await Idea.findById(req.params.id);

		// match the username
		if (idea.username === req.body.username) {
			await Idea.findByIdAndDelete(id);
			return res.json({
				success: true,
				message: `message ${id} was deleted`,
			});
		}
		res.status(403).json({
			success: false,
			error: 'you are not authorized to delete this resource',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'error deleting message, server error',
		});
	}
});

module.exports = router;
