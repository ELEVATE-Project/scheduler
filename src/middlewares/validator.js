/**
 * name : middlewares/validator
 * author : vishnu
 * Date : 22-june-2022
 * Description : Contains logic to call required validator from validators directory to validate request data
 */

module.exports = (req, res, next) => {
	try {
		require(`@validators/${req.params.controller}`)[req.params.method](req)
	} catch (error) {}
	next()
}
