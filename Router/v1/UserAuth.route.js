const {
	CreateUserCollaction,
	loginCollaction,
	refreshAccessToken,
	logout,
} = require('../../Collaction/UserAuth.collaction');
const { verifyToken } = require('../../Meddieware/verifyToken');

const router = require('express').Router();

router.post('/register', CreateUserCollaction);
router.post('/login', loginCollaction);
router.post('/logout', verifyToken, logout);
router.post('/refresh_token', refreshAccessToken);

module.exports = router;
