const { getAllAndPagination } = require('../../core/helpers');
const { User } = require('../../models');

module.exports = {
	home: async (req, res) => {
		const users = await getAllAndPagination(User, req.query);
		res.render('front/home', { users });
	},

	show: async (req, res) => {
		const user = await User.findByPk(req.params.id);
		return res.json({ message: 'Ok', status: 200, data: user });
	}
};
