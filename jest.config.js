module.exports = {
  roots: ['<rootDir>/BoroTs'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.html?$": "html-loader-jest",
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}