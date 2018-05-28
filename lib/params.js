module.exports = require('yargs')
  .usage('Usage: $0 [options]')
  .describe('mode', 'Modo de ejecucion')
  .choices('mode', ['check', 'open'])
  .alias('m', 'mode')  
  .demandOption(['mode'])
  .help('h')
  .alias('h', 'help').argv;