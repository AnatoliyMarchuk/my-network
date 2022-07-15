const express = require('express');
const router = express.Router();
const User = require('./user');

router.get('/users', (reg, res) => {
	User.find({}).then((user) => {
		res.send(user);
	});
});

router.post('/users', (reg, res) => {
	User.create(reg.body).then((user) => {
		res.send(user);
	});
});

router.put('/users/:id', (reg, res) => {
	User.findByIdAndUpdate({ _id: reg.params.id }, reg.body).then(() => {
		User.findOne({ _id: reg.params.id }).then((user) => {
			res.send(user);
		});
	});
});

router.delete('/users/:id', (reg, res) => {
	User.deleteOne({ _id: reg.params.id }).then((user) => {
		res.send(user);
	});
});

module.exports = router;
