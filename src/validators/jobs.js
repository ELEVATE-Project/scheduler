module.exports = {
	create: (req) => {
		req.checkBody('name').trim().notEmpty().withMessage('name field is empty')

		req.checkBody('request.method').trim().notEmpty().withMessage('method field is empty')

		req.checkBody('request.url').trim().notEmpty().withMessage('url field is empty')

		req.checkBody('schedule.scheduleType').trim().notEmpty().withMessage('scheduleType field is empty')

		req.checkBody('email')
			.trim()
			.notEmpty()
			.withMessage('email field is empty')
			.isEmail()
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
			.withMessage('email is invalid')
			.normalizeEmail()
	},

	once: (req) => {
		req.checkBody('name', 'required job name').notEmpty()
		req.checkBody('interval', 'required interval').notEmpty()
	},

	every: (req) => {
		req.checkBody('name', 'required job name').notEmpty()
		req.checkBody('interval', 'required interval').notEmpty()
	},

	cancel: (req) => {
		req.checkBody('name', 'required job name').notEmpty()
	},

	run: (req) => {
		req.checkBody('name', 'required job name').notEmpty()
	},

	delete: (req) => {
		req.checkBody('jobname', 'required job name').notEmpty()
	},

	update: (req) => {
		req.checkBody('name', 'required job name').notEmpty()
	},
}
