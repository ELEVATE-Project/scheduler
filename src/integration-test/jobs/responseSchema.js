const listSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'array',
			items: [
				{
					type: 'object',
					properties: {
						name: {
							type: 'string',
						},
						opts: {
							type: 'object',
							properties: {
								attempts: {
									type: 'integer',
								},
								delay: {
									type: 'integer',
								},
								prevMillis: {
									type: 'integer',
								},
								timestamp: {
									type: 'integer',
								},
								removeOnFail: {
									type: 'integer',
								},
								removeOnComplete: {
									type: 'integer',
								},
								jobId: {
									type: 'string',
								},
								repeat: {
									type: 'object',
									properties: {
										jobId: {
											type: 'string',
										},
										pattern: {
											type: 'string',
										},
										count: {
											type: 'integer',
										},
									},
									required: ['jobId', 'pattern', 'count'],
								},
							},
							required: [
								'attempts',
								'delay',
								'prevMillis',
								'timestamp',
								'removeOnFail',
								'removeOnComplete',
								'jobId',
								'repeat',
							],
						},
						id: {
							type: 'string',
						},
						progress: {
							type: 'integer',
						},
						returnvalue: {
							type: 'null',
						},
						stacktrace: {
							type: 'array',
							items: {},
						},
						attemptsMade: {
							type: 'integer',
						},
						delay: {
							type: 'integer',
						},
						repeatJobKey: {
							type: 'string',
						},
						timestamp: {
							type: 'integer',
						},
					},
					required: [
						'name',
						'opts',
						'id',
						'progress',
						'returnvalue',
						'stacktrace',
						'attemptsMade',
						'delay',
						'repeatJobKey',
						'timestamp',
					],
				},
			],
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}
const createCronSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				data: {
					type: 'object',
					properties: {
						email: {
							type: 'array',
							items: [
								{
									type: 'string',
								},
							],
						},
						request: {
							type: 'object',
							properties: {
								url: {
									type: 'string',
								},
								method: {
									type: 'string',
								},
								header: {
									type: 'object',
									properties: {
										internal_access_token: {
											type: 'string',
										},
									},
									required: ['internal_access_token'],
								},
							},
							required: ['url', 'method', 'header'],
						},
					},
					required: ['email', 'request'],
				},
				opts: {
					type: 'object',
					properties: {
						attempts: {
							type: 'integer',
						},
						delay: {
							type: 'integer',
						},
						jobId: {
							type: 'string',
						},
						repeat: {
							type: 'object',
							properties: {
								pattern: {
									type: 'string',
								},
								jobId: {
									type: 'string',
								},
								count: {
									type: 'integer',
								},
							},
							required: ['pattern', 'jobId', 'count'],
						},
						removeOnComplete: {
							type: 'integer',
						},
						removeOnFail: {
							type: 'integer',
						},
						timestamp: {
							type: 'integer',
						},
						prevMillis: {
							type: 'integer',
						},
					},
					required: [
						'attempts',
						'delay',
						'jobId',
						'repeat',
						'removeOnComplete',
						'removeOnFail',
						'timestamp',
						'prevMillis',
					],
				},
				id: {
					type: 'string',
				},
				progress: {
					type: 'integer',
				},
				returnvalue: {
					type: 'null',
				},
				stacktrace: {
					type: 'null',
				},
				attemptsMade: {
					type: 'integer',
				},
				delay: {
					type: 'integer',
				},
				repeatJobKey: {
					type: 'string',
				},
				timestamp: {
					type: 'integer',
				},
			},
			required: [
				'name',
				'data',
				'opts',
				'id',
				'progress',
				'returnvalue',
				'stacktrace',
				'attemptsMade',
				'delay',
				'repeatJobKey',
				'timestamp',
			],
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}

const createDelaySchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				data: {
					type: 'object',
					properties: {
						email: {
							type: 'array',
							items: [
								{
									type: 'string',
								},
							],
						},
						request: {
							type: 'object',
							properties: {
								url: {
									type: 'string',
								},
								method: {
									type: 'string',
								},
								header: {
									type: 'object',
									properties: {
										internal_access_token: {
											type: 'string',
										},
									},
									required: ['internal_access_token'],
								},
							},
							required: ['url', 'method', 'header'],
						},
					},
					required: ['email', 'request'],
				},
				opts: {
					type: 'object',
					properties: {
						attempts: {
							type: 'integer',
						},
						delay: {
							type: 'integer',
						},
						jobId: {
							type: 'string',
						},
						removeOnComplete: {
							type: 'boolean',
						},
						removeOnFail: {
							type: 'boolean',
						},
					},
					required: ['attempts', 'delay', 'jobId', 'removeOnComplete', 'removeOnFail'],
				},
				id: {
					type: 'string',
				},
				progress: {
					type: 'integer',
				},
				returnvalue: {
					type: 'null',
				},
				stacktrace: {
					type: 'null',
				},
				attemptsMade: {
					type: 'integer',
				},
				delay: {
					type: 'integer',
				},
				timestamp: {
					type: 'integer',
				},
			},
			required: [
				'name',
				'data',
				'opts',
				'id',
				'progress',
				'returnvalue',
				'stacktrace',
				'attemptsMade',
				'delay',
				'timestamp',
			],
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}
const createIntervalSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				data: {
					type: 'object',
					properties: {
						email: {
							type: 'array',
							items: [
								{
									type: 'string',
								},
							],
						},
						request: {
							type: 'object',
							properties: {
								url: {
									type: 'string',
								},
								method: {
									type: 'string',
								},
								header: {
									type: 'object',
									properties: {
										internal_access_token: {
											type: 'string',
										},
									},
									required: ['internal_access_token'],
								},
							},
							required: ['url', 'method', 'header'],
						},
					},
					required: ['email', 'request'],
				},
				opts: {
					type: 'object',
					properties: {
						attempts: {
							type: 'integer',
						},
						delay: {
							type: 'integer',
						},
						jobId: {
							type: 'string',
						},
						repeat: {
							type: 'object',
							properties: {
								every: {
									type: 'integer',
								},
								limit: {
									type: 'integer',
								},
								jobId: {
									type: 'string',
								},
								count: {
									type: 'integer',
								},
							},
							required: ['every', 'limit', 'jobId', 'count'],
						},
						removeOnComplete: {
							type: 'integer',
						},
						removeOnFail: {
							type: 'integer',
						},
						timestamp: {
							type: 'integer',
						},
						prevMillis: {
							type: 'integer',
						},
					},
					required: [
						'attempts',
						'delay',
						'jobId',
						'repeat',
						'removeOnComplete',
						'removeOnFail',
						'timestamp',
						'prevMillis',
					],
				},
				id: {
					type: 'string',
				},
				progress: {
					type: 'integer',
				},
				returnvalue: {
					type: 'null',
				},
				stacktrace: {
					type: 'null',
				},
				attemptsMade: {
					type: 'integer',
				},
				delay: {
					type: 'integer',
				},
				repeatJobKey: {
					type: 'string',
				},
				timestamp: {
					type: 'integer',
				},
			},
			required: [
				'name',
				'data',
				'opts',
				'id',
				'progress',
				'returnvalue',
				'stacktrace',
				'attemptsMade',
				'delay',
				'repeatJobKey',
				'timestamp',
			],
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}
const removeSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'boolean',
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}

const purgeCleanSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'array',
			items: {},
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}
const purgeDrainSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'object',
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}
const purgeObliterateSchema = {
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
		},
		responseCode: {
			type: 'integer',
		},
		message: {
			type: 'string',
		},
		result: {
			type: 'object',
		},
		meta: {
			type: 'object',
			properties: {
				correlation: {
					type: 'string',
				},
			},
			required: ['correlation'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result', 'meta'],
}
module.exports = {
	listSchema,
	createCronSchema,
	createIntervalSchema,
	createDelaySchema,
	removeSchema,
	purgeCleanSchema,
	purgeDrainSchema,
	purgeObliterateSchema,
}
