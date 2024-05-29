const {
	CreateUserCollaction,
	loginCollaction,
} = require('../../Collaction/UserAuth.collaction');

const router = require('express').Router();

router.post('/register', CreateUserCollaction);

router.post('/login', loginCollaction);

module.exports = router;
