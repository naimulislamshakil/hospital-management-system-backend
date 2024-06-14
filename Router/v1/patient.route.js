const { addPatients } = require('../../Collaction/Patient.Collaction');
const { uplode } = require('../../Meddieware/multer');
const { verifyToken } = require('../../Meddieware/verifyToken');

const router = require('express').Router();

router.post('/addPatient', verifyToken, uplode.single('image'), addPatients);

module.exports = router;
