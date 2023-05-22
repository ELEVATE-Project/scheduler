const numberOrBoolean = (value) => {
	return typeof value === 'number' || typeof value === 'boolean'
}
module.exports = {
	create: (req) => {
		req.checkBody('jobName').notEmpty().withMessage('Job name is required'),
			req.checkBody('request.url').notEmpty().withMessage('Request URL is required'),
			req.checkBody('request.method').notEmpty().withMessage('Request method is required'),
			req
				.checkBody('request.header.internal_access_token')
				.notEmpty()
				.withMessage('Internal access token is required'),
			req.checkBody('jobOptions.jobId').notEmpty().withMessage('Job ID is required'),
			req
				.checkBody('jobOptions.delay')
				.optional({ nullable: true })
				.isInt({ min: 0 })
				.withMessage('Delay should be a non-negative integer'),
			req
				.checkBody('jobOptions.removeOnComplete')
				.optional({ nullable: true })
				.custom(numberOrBoolean)
				.withMessage('removeOnComplete should be a number or a boolean'),
			req
				.checkBody('jobOptions.removeOnFail')
				.optional({ nullable: true })
				.custom(numberOrBoolean)
				.withMessage('removeOnFail should be a number or a boolean'),
			req
				.checkBody('jobOptions.attempts')
				.optional({ nullable: true })
				.isInt({ min: 1 })
				.withMessage('Attempts should be a positive integer'),
			req
				.checkBody('jobOptions.repeat.pattern')
				.optional({ nullable: true })
				.isString()
				.withMessage('Repeat pattern should be a string'),
			req
				.checkBody('jobOptions.repeat.every')
				.optional({ nullable: true })
				.isInt({ min: 1 })
				.withMessage('Repeat every should be a positive integer'),
			req
				.checkBody('jobOptions.repeat.limit')
				.optional({ nullable: true })
				.isInt({ min: 1 })
				.withMessage('Repeat limit should be a positive integer'),
			req
				.checkBody('email')
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
	remove: (req) => {
		req.checkBody('jobId', 'Job ID is required').notEmpty()
	},
}
