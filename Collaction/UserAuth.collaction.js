const UserModel = require('../Schema/UserAuth.Schema');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/ApiResponce');
const asyncHandler = require('../Utils/AsyncHandler');
const bcrypt = require('bcrypt');

exports.CreateUserCollaction = asyncHandler(async (req, res) => {
	// first chack get all data from frontend
	const { email, password, firstName, lastname } = req.body;

	// check field not empty
	if (
		[email, password, firstName, lastname].some((field) => field?.trim() === '')
	) {
		throw new ApiError(400, 'All field are required');
	}

	// check user not exzist
	const exzist = await UserModel.findOne({ email });

	if (exzist) {
		throw new ApiError(409, 'User already exist !!!');
	}

	const user = await UserModel.create(req.body);

	const createdUser = await UserModel.findById({ _id: user._id }).select(
		'-password -refreshToken'
	);

	if (!createdUser) {
		throw new ApiError(500, 'Something went wrong !!!');
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, 'User registered Successfully'));
});

const generateAccessandRefreshToken = async (userId) => {
	try {
		const user = await UserModel.findById(userId);

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, 'Something went wrong!!!');
	}
};

exports.loginCollaction = asyncHandler(async (req, res) => {
	// check realy get data from backend
	// chack all fields are not empty
	// find user by email ==> if false create a error
	// check and compare password
	// create accessToken and refreshtoken
	// set accessToken and refreshToken by cookies
	// response with message, successs, and {data, accessToken, refreshToken}

	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(404, 'Email and Password is requerd!!');
	}

	const user = await UserModel.findOne({ email });

	if (!user) {
		throw new ApiError(404, 'User not register. Please register!');
	}

	const comparePassword = bcrypt.compareSync(password, user?.password);

	if (!comparePassword) {
		throw new ApiError(401, 'The provided email or password is incorrect');
	}

	const { accessToken, refreshToken } = await generateAccessandRefreshToken(
		user._id
	);

	const loggedInUser = await UserModel.findById(user._id).select(
		'-password -refreshToken'
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie('accessToken', accessToken, options)
		.cookie('refreshToken', refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser,
					accessToken,
					refreshToken,
				},
				'User logged In Successfully'
			)
		);
});
