module.exports = {
	rootDir: '.',
	roots: ['<rootDir>/'],
	preset: '@shelf/jest-mongodb',
	moduleNameMapper: {
		'@root/(.*)': '<rootDir>/$1',
		'@services/(.*)': '<rootDir>/services/$1',
		'@controllers/(.*)': '<rootDir>/controllers/$1',
		'@generics/(.*)': '<rootDir>/generics/$1',
		'@constants/(.*)': '<rootDir>/constants/$1',
		'@configs/(.*)': ['<rootDir>/configs/$1'],
	},
	/* 	collectCoverageFrom: ['./services/**'],
	coverageThreshold: {
		global: {
			branches: 1,
			functions: 1,
			lines: 1,
			statements: 1,
		},
	}, */
}
