const {
	CreateUserCollaction,
} = require('../../Collaction/UserAuth.collaction');

const router = require('express').Router();

router.post('/register', CreateUserCollaction);

module.exports = router;
