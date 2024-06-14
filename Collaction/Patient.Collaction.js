const ApiError = require('../Utils/ApiError');
const asyncHandler = require('../Utils/AsyncHandler');
const uplodeCloudinary = require('../Utils/Cloudinary');

exports.addPatients = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		gender,
		phoneNumber,
		emergencyNumber,
		address,
		image,
		dob,
	} = req.body;

	const localImage = req?.file?.path;

	if (
		[
			name,
			email,
			gender,
			phoneNumber,
			emergencyNumber,
			address,
			image,
			dob,
		].some((field) => field?.trim() === '')
	) {
		throw new ApiError(400, 'All field are required');
	}

	if (!localImage) {
		throw new ApiError(400, 'Image is required!!!');
	}

	const cloudinaryImage = await uplodeCloudinary(localImage);

	if (!cloudinaryImage) {
		throw new ApiError(400, 'Image is required!!!');
	}

	const data = {
		name,
		email,
		gender,
		phoneNumber,
		emergencyNumber,
		address,
		image: cloudinaryImage.url,
		dob,
	};

	console.log(data);
});
