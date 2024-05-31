const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new schema(
	{
		email: String,
		firstName: String,
		lastName: String,
		password: String,
		refreshToken: String,
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

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET_KEY,
		{ expiresIn: process.env.ACCESS_TOKEN_EXPAIR_DATE }
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ id: this._id }, process.env.REFRESH_TOKENSECRET_KEY, {
		expiresIn: process.env.REFRESH_TOKEN_EXPAIR_DATE,
	});
};

const UserModel = mongoose.model('USER', userSchema);

module.exports = UserModel;
