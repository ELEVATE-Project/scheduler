/**
 * name : health.config.js.
 * author : Mallanagouda R Biradar
 * created-date : 15-Jul-2025
 * Description : Health check config file
 */

module.exports = {
	name: process.env.SERVICE_NAME,
	version: '1.0.0',
	checks: {
		bullmq: {
			enabled: true,
			redisHost: process.env.REDIS_HOST,
			redisPort: process.env.REDIS_PORT,
		},
		microservices: [],
	},
}
