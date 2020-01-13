const { getAllAndPagination, responseApi } = require("../../core/helpers");
const { Group, User, Usergroup } = require("../../models");

module.exports = {
	home: async (req, res) => {
		const groups = await getAllAndPagination(Group, req.query, { include: { model: User } });
		const listGroups = await Group.findAll({ raw: true });
		const users = await User.findAll({});
		/*
		const group = await Group.findOne({ where: { id: "627f5376-90f3-42db-bcd8-f72f01083e90" } });
		const user = await User.create({ name: "Nasrul Fuad", email: "okwa@owak.com", phone_number: "0000" });
		const users = await group.addUser(user);
		*/
		res.render("group/home", { groups, listGroups, users });
	},

	/* Create new a user and set to group */
	create: async (req, res) => {
		const { name, email, phone_number, groups } = req.body;
		const [user, isCreated] = await User.findOrCreate({
			where: { name },
			defaults: { email, phone_number },
			raw: true
		});

		if (!isCreated) return res.json(responseApi(true, 403, "User is already created!"));

		await user.addGroups(groups);
		return res.json(responseApi(true, null, "User succesfully created!"));
	},

	show: async (req, res) => {
		const group = await Group.findByPk(req.params.id, { include: [User] });
		return res.json(responseApi(true, null, null, group));
	},

	update: async (req, res) => {
		await Group.update(req.body, { where: { id: req.params.id } });
		return res.json(responseApi(true, null, "Record updated succesfully!"));
	}
};
