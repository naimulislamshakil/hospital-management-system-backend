const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
	cloud_name: 'dopm2zqga',
	api_key: '851715781455471',
	api_secret: process.env.API_SECRET,
});

const uplodeCloudinary = async (file) => {
	try {
		if (!file) {
			return null;
		}

		const responce = await cloudinary.uploader.upload(file);


		// fs.unlinkSync(localFilePath);

		return responce;
	} catch (error) {
		// fs.unlink(file);
		console.log(error);
		return null;
	}
};

module.exports = uplodeCloudinary;
