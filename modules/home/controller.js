const { getAllAndPagination, responseApi } = require('../../core/helpers');
const { User } = require('../../models');

module.exports = {
	home: async (req, res) => {
		const users = await getAllAndPagination(User, req.query);
		res.render('front/home', { users });
	},

	show: async (req, res) => {
		const user = await User.findByPk(req.params.id);
		return res.json(responseApi(true, null, null, user));
	},

	update: async (req, res) => {
		const { name, email, phone: phone_number } = req.body;
		await User.update({ name, email, phone_number }, { where: { id: req.params.id } });
		return res.json(responseApi(true, null, 'Updated!'));
	}
};
