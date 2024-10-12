
const lodash = require('lodash')
const autoImport = require('./.eslintrc-auto-import.json')
const main = require('./.eslintrc-main.json')

module.exports = lodash.merge(main, autoImport)
