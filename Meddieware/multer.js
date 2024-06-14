const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(file);
		cb(null, './public/temp');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
exports.uplode = multer({ storage });
