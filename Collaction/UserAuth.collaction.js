const UserModel = require('../Schema/UserAuth.Schema');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/ApiResponce');
const asyncHandler = require('../Utils/AsyncHandler');

exports.CreateUserCollaction = asyncHandler(async (req, res) => {
	// first chack get all data from frontend
	const { email, password } = req.body;

	// check field not empty
	if ([email, password].some((field) => field?.trim() === '')) {
		throw new ApiError(400, 'All field are required');
	}

	// check user not exzist
	const exzist = await UserModel.findOne({ email });

	if (exzist) {
		throw new ApiError(409, 'User already exist !!!');
	}

	const user = await UserModel.create(req.body);

	const createdUser = await UserModel.findById({ _id: user._id });

	if (!createdUser) {
		throw new ApiError(500, 'Something went wrong !!!');
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, 'User registered Successfully'));
});
