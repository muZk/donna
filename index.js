#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')
const keyMirror = require('keymirror')
const version = require('./package.json').version

const SERVICES = keyMirror({
  sii: null,
  previred: null,
  itau: null
})

const services = {
  [SERVICES.sii]: require('./services/sii/f29'),
  [SERVICES.previred]: require('./services/previred/contributions'),
  [SERVICES.itau]: require('./services/itau/cae')
}

program.version(version, '-v, --version')

program
  .command('pay')
  .alias('p')
  .option('-s, --service <name>', `One of ${Object.keys(SERVICES)}`)
  .action(async options => {
    const questions = {
      service: {
        type: 'list',
        name: 'service',
        message: '¿Qué servicio deseas pagar?',
        choices: [
          { name: 'F29 - SII', value: SERVICES.sii },
          { name: 'Previsión - Previred', value: SERVICES.previred },
          { name: 'CAE - Itaú', value: SERVICES.itau }
        ]
      },
      rut: {
        type: 'text',
        name: 'rut',
        message: 'RUT'
      },
      password: {
        type: 'password',
        name: 'password',
        message: 'Contraseña del servicio'
      }
    }

    const ask = async question => {
      const answer = await prompt([questions[question]])
      return answer[question]
    }

    const service =
      options.service && services[options.service]
        ? options.service
        : await ask('service')

    const rut = process.env.RUT || (await ask('rut'))

    const password =
      process.env[`${service.toUpperCase()}_PASSWORD`] ||
      (await ask('password'))

    await services[service](rut, password)
  })

program.parse(process.argv)
