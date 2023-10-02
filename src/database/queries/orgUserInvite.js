'use strict'
const OrgUserInvite = require('../models/index').OrgUserInvite

exports.create = async (data) => {
	try {
		return await OrgUserInvite.create(data)
	} catch (error) {
		return error
	}
}

exports.update = async (filter, update, options) => {
	try {
		const [res] = await OrgUserInvite.update(update, {
			where: filter,
			...options,
			individualHooks: true,
		})
		return res
	} catch (error) {
		return error
	}
}
