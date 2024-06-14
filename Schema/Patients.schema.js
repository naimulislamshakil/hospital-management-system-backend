const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patientSchema = new schema(
	{
		name: String,
		email: String,
		gender: String,
		phoneNumber: String,
		emergencyNumber: String,
		address: String,
		image: String,
		dob: String,
	},
	{ timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
