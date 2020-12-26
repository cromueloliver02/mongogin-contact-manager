const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model
const User = require('../_models/User');

// @route      POST /api/user
// @desc       Register user
// @access     Public
router.post(
	'/',
	[
		body('name', 'Name is required').not().isEmpty(),
		body('email', 'Email is required').isEmail(),
		body('password', 'Password must be atleast 6 characters').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'Email is already taken' });
			}

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// generate token
			// const payload = {
			// 	user: {
			// 		id: user.id
			// 	}
			// };
			// jwt.sign(
			// 	payload,
			// 	process.env.JWT_SECRET,
			// 	{
			// 		expiresIn: 36000
			// 	},
			// 	(err, token) => {
			// 		if (err) throw err;
			// 		res.json({ token });
			// 	}
			// );
			res.json({ success: true });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
