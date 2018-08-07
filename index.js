#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')
const keyMirror = require('keyMirror')
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

program.command('pay').alias('p').action(async () => {
  const { service, rut, password } = await prompt([
    {
      type: 'list',
      name: 'service',
      message: '¿Qué servicio deseas pagar?',
      choices: [
        { name: 'F29 - SII', value: SERVICES.sii },
        { name: 'Previsión - Previred', value: SERVICES.previred },
        { name: 'CAE - Itaú', value: SERVICES.itau }
      ]
    },
    {
      type: 'text',
      name: 'rut',
      message: 'RUT'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Contraseña del servicio'
    }
  ])
  await services[service](rut, password)
})

program.parse(process.argv)
