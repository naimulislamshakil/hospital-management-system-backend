const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema(
	{
		email: String,
		password: String,
		roll: {
			type: String,
			enum: ['Doctor', 'Admin', 'Staff', 'Patient'],
			default: 'Patient',
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();

	const pass = this.password;
	const hashPass = bcrypt.hashSync(pass, 10);
	this.password = hashPass;
	next();
});

const UserModel = mongoose.model('USER', userSchema);

module.exports = UserModel;
