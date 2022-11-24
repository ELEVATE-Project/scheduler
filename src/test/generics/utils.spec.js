describe('Utils', () => {
	let utils

	beforeAll(async () => {
		utils = require('@generics/utils')
		return
	})

	test('Should return md5 hash', async () => {
		const actual = await utils.md5Hash('6329891e13fa52673aeb8c4f')
		expect(actual).toEqual('c3bf9eef82ce2ef0c4bc11a2124ec2a7')
	})
	test('Should return ist date', async () => {
		const actual = await utils.getIstDate()
		expect(actual).toBeDefined()
	})
})
