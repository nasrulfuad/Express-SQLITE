const { getAllAndPagination } = require('../../core/helpers');
const { User } = require('../../models');

module.exports = {
	home: async (req, res) => {
		const users = await getAllAndPagination(User, req.query);
		users.rows.forEach(user => console.log(user.number));
		res.render('front/home', { users });
	},

	show: async (req, res) => {
		const user = await User.findByPk(req.params.id);
		const users = await getAllAndPagination(User, req.query);
		res.render('front/show', { user });
	}
};
