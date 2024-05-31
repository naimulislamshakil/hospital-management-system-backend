const {
	CreateUserCollaction,
	loginCollaction,
	refreshAccessToken,
} = require('../../Collaction/UserAuth.collaction');

const router = require('express').Router();

router.post('/register', CreateUserCollaction);

router.post('/login', loginCollaction);
router.post('/refresh_token', refreshAccessToken);

module.exports = router;
