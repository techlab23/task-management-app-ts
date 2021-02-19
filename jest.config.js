module.exports = {
  preset: 'ts-jest',
  globals: {
    'vue-jest': {
      pug: {
        doctype: 'html',
      },
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
}