const jwt = require('jsonwebtoken');
const asyncHandler = require('../Utils/AsyncHandler');
const ApiError = require('../Utils/ApiError');

const veryfyToken = asyncHandler(async (req, _, next) => {
	try {
		const token = req.cookies.accessToken || req.body;

		if (!token) {
			throw new ApiError(401, 'Unauthorize Access!!');
		}

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

		req.user = decoded;
	} catch (error) {
		throw new ApiError(401, 'Unauthorize Access!!');
	}
});
