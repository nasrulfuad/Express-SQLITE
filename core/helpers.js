module.exports = {
	/* For catching error on controller **/
	errHandler: fn => (req, res, next) => {
		try {
			const result = fn(req, res, next);
			return result.catch(next);
		} catch (err) {
			return next(err);
		}
	},

	/* For response an api **/
	responseApi: (s, c, m, data) => ({
		status: s ? s : false,
		code: c ? c : 200,
		message: m ? m : 'Success',
		data
	}),

	/* For data pagination (@res json) **/
	getAllAndPagination: async (model, q, option) => {
		const page = parseInt(q.page) || 1;
		const limit = parseInt(q.limit) || 10;
		const startIndex = (page - 1) * limit;
		let no = startIndex;

		let options = {
			offset: startIndex,
			order: [['createdAt', 'DESC']],
			raw: true,
			limit
		};

		if (option) options = { ...options, ...option };
		let { count, rows } = await model.findAndCountAll(options);

		/*
			Adding number every rows
		*/
		rows = rows.map(r => {
			r.number = ++no;
			return r;
		});

		const previous = startIndex > 0 ? { page: page - 1, limit } : undefined;
		const next = page * limit < count ? { page: page + 1, limit } : undefined;

		return {
			totalRows: count,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			next,
			previous,
			rows
		};
	}
};
