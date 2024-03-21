/**
 * name : middlewares/validator
 * author : vishnu
 * Date : 22-june-2022
 * Description : Contains logic to call required validator from validators directory to validate request data
 */

module.exports = (req, res, next) => {
	try {
		const controllerName = (req.params.controller.match(/^[a-zA-Z0-9_-]+$/) || [])[0] // Allow only alphanumeric characters, underscore, and hyphen
		const method = (req.params.method.match(/^[a-zA-Z0-9]+$/) || [])[0] // Allow only alphanumeric characters

		require(`@validators/${controllerName}`)[method](req)
	} catch (error) {}
	next()
}
