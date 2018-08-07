const puppeteer = require('puppeteer')

const LOGIN =
  'https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html'
const F29 = 'https://www4.sii.cl/propuestaf29ui/index.html'

async function task (rut, password) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(LOGIN)
  await page.type('#rutcntr', rut)
  await page.type('#clave', password)
  page.click('#myform button')
  await page.waitForNavigation()
  await page.goto(F29)
  await page.waitForSelector('button.btn-primary:not([disabled])')
  page.click('button.btn-primary')
  await page.waitForNavigation()
  await page.waitForSelector(
    'button.gwt-Button.imagenBtnValidar:not([disabled])'
  )
  page.click('button.gwt-Button.imagenBtnValidar:not([disabled])', {
    visible: true
  })
}

module.exports = task
