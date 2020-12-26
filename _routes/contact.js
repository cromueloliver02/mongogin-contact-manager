const express = require('express');
const router = express.Router();
const auth = require('../_middlewares/auth');
const { body, validationResult } = require('express-validator');

// model
const Contact = require('../_models/Contact');

// @route      GET /api/contacts
// @desc       Get all user's contact
// @access     Private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1
		});

		res.json({
			success: true,
			data: contacts,
			msg: 'Contacts successfully retrieved'
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route      POST /api/contacts
// @desc       Add contact
// @access     Private
router.post(
	'/',
	[
		auth,
		[
			body('name', 'Name is required').not().isEmpty(),
			body('email', 'Please enter a valid email').isEmail(),
			body('phone', 'Phone is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type, address } = req.body;

		try {
			let contacts = await Contact.find({ user: req.user.id });

			const isEmailExist = contacts.some(contact => {
				if (contact.email === email) {
					return true;
				}
			});
			if (isEmailExist) {
				return res.status(400).json({ msg: 'Email already exists' });
			}

			const isPhoneExist = contacts.some(contact => {
				if (contact.phone === phone) {
					return true;
				}
			});
			if (isPhoneExist) {
				return res.status(400).json({ msg: 'Phone number already exists' });
			}

			contact = new Contact({
				user: req.user.id,
				name,
				email,
				phone,
				type,
				address
			});

			await contact.save();

			res.json({
				success: true,
				data: contact,
				msg: 'Contact successfully added'
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route      PUT /api/contacts/:contact_id
// @desc       Update contact
// @access     Private
router.put(
	'/:contact_id',
	[
		auth,
		[
			body('name', 'Name is required').not().isEmpty(),
			body('email', 'Please enter a valid email').isEmail(),
			body('phone', 'Phone is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type, address } = req.body;

		try {
			let contact = await Contact.findById(req.params.contact_id);

			if (!contact) {
				return res.status(404).json({ msg: 'Contact not found' });
			}

			if (contact.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'Request denied' });
			}

			const contactFields = {};
			if (name) contactFields.name = name;
			if (email) contactFields.email = email;
			if (phone) contactFields.phone = phone;
			if (address) contactFields.address = address;
			if (type) contactFields.type = type;

			contact = await Contact.findByIdAndUpdate(
				req.params.contact_id,
				{ $set: contactFields },
				{ new: true }
			);

			res.json({
				success: true,
				data: contact,
				msg: 'Contact successfully updated'
			});
		} catch (err) {
			console.error(err.message);

			if (err.kind === 'ObjectId') {
				return res
					.status(404)
					.json({ success: false, msg: 'Contact not found' });
			}

			res.status(500).send('Server error');
		}
	}
);

// @route      DELETE /api/contacts/:contact_id
// @desc       Delete contact
// @access     Private
router.delete('/:contact_id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.contact_id);

		if (!contact) {
			return res
				.status(404)
				.json({ success: false, msg: 'Contact not found' });
		}

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ success: false, msg: 'Request denied' });
		}

		await contact.remove();

		res.json({ success: true, msg: 'Contact successfully deleted' });
	} catch (err) {
		console.error(err.message);

		if (err.kind === 'ObjectId') {
			return res
				.status(404)
				.json({ sucess: false, msg: 'Contact not found' });
		}

		res.status(500).send('Server error');
	}
});

module.exports = router;
