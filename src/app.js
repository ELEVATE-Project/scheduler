require('module-alias/register')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const { elevateLog, correlationIdMiddleware } = require('elevate-logger')
elevateLog.config(process.env.ERROR_LOG_LEVEL, 'scheduler', process.env.DISABLE_LOG)
const logger = elevateLog.init()

//config
require('./configs')
const { jobsReady } = require('./services/agendaServices')

//express
const app = express()

const PORT = process.env.APPLICATION_PORT

//middleware definition
app.use(bodyParser.json({ limit: '50MB' }))
app.use(bodyParser.urlencoded({ limit: '50MB', extended: false }))
app.use(correlationIdMiddleware)

app.all('*', (req, res, next) => {
	logger.info('***Scheduler Service Request Log***', {
		request: {
			requestType: `Request Type ${req.method} for ${req.url} on ${new Date()} from `,
			requestHeaders: req.headers,
			requestBody: req.body,
			requestFiles: req.files,
		},
	})
	next()
})

/*api-doc  */
app.get(process.env.API_DOC_URL, function (req, res) {
	res.sendFile(path.join(__dirname, './api-doc/index.html'))
})

/* Registered routes here */
require('./routes')(app)

//starting the server at port defined in config.js
const server = app.listen(PORT, () => {
	logger.info(`server started at: http://localhost:${PORT}`)
})

async function graceful() {
	logger.info('\nClosing server...')
	await server.close()
	logger.info('Shutting down gracefully...')
	await agenda.stop()
	process.exit(0)
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)
