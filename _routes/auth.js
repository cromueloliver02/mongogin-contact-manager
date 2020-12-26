const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../_middlewares/auth');

// model
const User = require('../_models/User');

// @route      POST /api/auth
// @desc       Load user
// @access     Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json({ user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route      POST /api/auth
// @desc       Login user
// @access     Public
router.post(
	'/',
	[
		body('email', 'Please enter your valid email').isEmail(),
		body('password', 'Password must be atleast 6 characters').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Incorrect credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: 'Incorrect credentials' });
			}

			// generate token
			const payload = {
				user: {
					id: user.id
				}
			};
			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{
					expiresIn: 36000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
