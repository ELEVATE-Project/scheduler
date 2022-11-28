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
			type: 'object',
			properties: {
				data: {
					type: 'array',
					items: [
						{
							type: 'object',
							properties: {
								_id: {
									type: 'string',
								},
								name: {
									type: 'string',
								},
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
							required: ['_id', 'name', 'email', 'request'],
						},
					],
				},
			},
			required: ['data'],
		},
	},
	required: ['success', 'responseCode', 'message', 'result'],
}
const commonResponseSchema = {
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
	},
	required: ['success', 'responseCode', 'message', 'result'],
}
module.exports = {
	listSchema,
	commonResponseSchema,
}
