/**
 * name : routes
 * author : vishnu
 * Date : 22-june-2022
 * Description : Routes for available service
 */

const validator = require('@middlewares/validator')
const expressValidator = require('express-validator')
const { elevateLog, correlationId } = require('elevate-logger')
const logger = elevateLog.init()
const fs = require('fs')
const path = require('path')

module.exports = (app) => {
	app.use(expressValidator())
	async function getAllowedControllers(directoryPath) {
		try {
			const getAllFilesAndDirectories = (dir) => {
				let filesAndDirectories = []
				fs.readdirSync(dir).forEach((item) => {
					const itemPath = path.join(dir, item)
					const stat = fs.statSync(itemPath)
					if (stat.isDirectory()) {
						filesAndDirectories.push({
							name: item,
							type: 'directory',
							path: itemPath,
						})
						filesAndDirectories = filesAndDirectories.concat(getAllFilesAndDirectories(itemPath))
					} else {
						filesAndDirectories.push({
							name: item,
							type: 'file',
							path: itemPath,
						})
					}
				})
				return filesAndDirectories
			}

			const allFilesAndDirectories = getAllFilesAndDirectories(directoryPath)
			const allowedControllers = allFilesAndDirectories
				.filter((item) => item.type === 'file' && item.name.endsWith('.js'))
				.map((item) => path.basename(item.name, '.js')) // Remove the ".js" extension

			return {
				allowedControllers,
			}
		} catch (err) {
			console.error('Unable to scan directory:', err)
			return {
				allowedControllers: [],
			}
		}
	}
	async function router(req, res, next) {
		let controllerResponse
		let validationError

		const controllerName = (req.params.controller.match(/^[a-zA-Z0-9_-]+$/) || [])[0] // Allow only alphanumeric characters, underscore, and hyphen
		const file = req.params.file ? (req.params.file.match(/^[a-zA-Z0-9_-]+$/) || [])[0] : null // Same validation as controller, or null if file is not provided
		const method = (req.params.method.match(/^[a-zA-Z0-9]+$/) || [])[0] // Allow only alphanumeric characters
		try {
			if (!controllerName || !method || (req.params.file && !file)) {
				// Invalid input, return an error response
				const error = new Error('Invalid Path')
				error.statusCode = 400
				throw error
			}

			const directoryPath = path.resolve(__dirname, '..', 'controllers')

			const { allowedControllers } = await getAllowedControllers(directoryPath)

			// Validate controller
			if (!allowedControllers.includes(controllerName)) {
				const error = new Error('Invalid controller.')
				error.statusCode = 400
				throw error
			}
		} catch (error) {
			return next(error)
		}

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
				controller = require(`@controllers/${controllerName}/${file}`)
			} else {
				controller = require(`@controllers/${controllerName}`)
			}
			controllerResponse = new controller()[method] ? await new controller()[method](req, res) : next()
		} catch (error) {
			// If controller or service throws some random error
			return next(error)
		}

		if (
			controllerResponse &&
			controllerResponse.status !== 200 &&
			controllerResponse.status !== 201 &&
			controllerResponse.status !== 202
		) {
			/* If error obtained then global error handler gets executed */
			return next(controllerResponse)
		}

		if (controllerResponse) {
			res.status(controllerResponse.status).json({
				success: controllerResponse.success,
				responseCode: controllerResponse.status,
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
		console.log(error)
		if (error.status || error.responseCode) {
			// Detailed error response
			const status = error.statusCode || 500
			const responseCode = error.responseCode || 'SERVER_ERROR'
			const message = error.message || 'Oops! Something Went Wrong.'
			const errorData = error.data || []

			logger.info(message, { message: error })

			const options = {
				responseCode,
				error: errorData,
				meta: { correlation: correlationId.getId() },
				message,
			}

			res.status(status).json(options)
		} else {
			// Limited info response
			const errorMessage = 'Oops! Something Went Wrong.'

			logger.error('Server error!', { message: error.stack, triggerNotification: true })
			console.error('Error occurred on the server:')
			console.error(error)

			res.status(500).json({
				responseCode: 'SERVER_ERROR',
				message: errorMessage,
				meta: { correlation: correlationId.getId() },
			})
		}
	})
}
