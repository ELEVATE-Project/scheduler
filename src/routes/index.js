/**
 * name : routes
 * author : vishnu
 * Date : 22-june-2022
 * Description : Routes for available service
 */

const validator = require('@middlewares/validator')
const expressValidator = require('express-validator')

module.exports = (app) => {
	app.use(expressValidator())

	async function router(req, res, next) {
		let controllerResponse
		let validationError

		/* Check for input validation error */
		try {
			validationError = req.validationErrors()
		} catch (error) {
			error.statusCode = 422
			error.responseCode = 'CLIENT_ERROR'
			return next(error)
		}

		if (validationError.length) {
			const error = new Error('Validation failed, Entered data is incorrect!')
			error.statusCode = 422
			error.responseCode = 'CLIENT_ERROR'
			error.data = validationError
			return next(error)
		}

		try {
			let controller
			if (req.params.file) {
				controller = require(`@controllers/${req.params.controller}/${req.params.file}`)
			} else {
				controller = require(`@controllers/${req.params.controller}`)
			}
			controllerResponse = new controller()[req.params.method]
				? await new controller()[req.params.method](req, res)
				: next()
		} catch (error) {
			// If controller or service throws some random error
			return next(error)
		}

		if (
			controllerResponse &&
			controllerResponse.statusCode !== 200 &&
			controllerResponse.statusCode !== 201 &&
			controllerResponse.statusCode !== 202
		) {
			/* If error obtained then global error handler gets executed */
			return next(controllerResponse)
		}
		if (controllerResponse) {
			res.status(controllerResponse.statusCode).json({
				responseCode: controllerResponse.responseCode,
				message: controllerResponse.message,
				result: controllerResponse.result,
				meta: controllerResponse.meta,
			})
		}
	}
	app.all(process.env.APPLICATION_BASE_URL + ':controller/:method', validator, router)
	app.all(process.env.APPLICATION_BASE_URL + ':controller/:method/:id', validator, router)
	app.all(process.env.APPLICATION_BASE_URL + ':controller/:file/:method', validator, router)
	app.all(process.env.APPLICATION_BASE_URL + ':controller/:file/:method/:id', validator, router)

	app.use((req, res, next) => {
		res.status(404).json({
			responseCode: 'RESOURCE_ERROR',
			message: 'Requested resource not found!',
		})
	})

	// Global error handling middleware, should be present in last in the stack of a middleware's
	app.use((error, req, res, next) => {
		const status = error.statusCode || 500
		const responseCode = error.responseCode || 'SERVER_ERROR'
		const message = error.message || ''
		let errorData = []

		if (error.data) {
			errorData = error.data
		}
		res.status(status).json({
			responseCode,
			message,
			error: errorData,
		})
	})
}