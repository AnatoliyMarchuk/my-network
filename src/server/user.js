const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id: Number,
	name: String,
	age: Number,
	followed: Boolean,
	photoUrl: String,
	status: String,
	location: {
		city: String,
		country: String,
	},
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
