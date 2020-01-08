module.exports = {
	errHandler: fn => (req, res, next) => {
		try {
			const result = fn(req, res, next);
			return result.catch(next);
		} catch (err) {
			return next(err);
		}
	},
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
