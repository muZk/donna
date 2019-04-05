const puppeteer = require('puppeteer')
const Promise = require('bluebird')

const LOGIN =
  'https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html'
const F29 = 'https://www4.sii.cl/propuestaf29ui/index.html'
const BANK_IMG =
  '/html/body/div[6]/div/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[7]/td/div/div[3]/div/img'

async function task (rut, password) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
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
    'button.gwt-Button.imagenBtnValidar:not([disabled])',
    {
      visible: true
    }
  )

  // I had to add this timeout because clicking the button was not working...
  await Promise.delay(1000)
  page.click('button.gwt-Button.imagenBtnValidar:not([disabled])')
  await page.waitForSelector('#gwt-uid-18', { visible: true })

  await Promise.delay(1000)
  page.click('#gwt-uid-18')

  // 1 = pago inmediato, 0 = pago al vencimiento
  await page.select('.gwt-ListBox:first-child', '1')

  const continueButton = await page.$x(
    "//button[contains(text(), 'Continuar')]"
  )
  if (continueButton.length === 1) {
    await continueButton[0].click()
    await page.waitForXPath(BANK_IMG, { visible: true })
    const img = await page.$x(BANK_IMG)
    await img[0].click()
    const paymentButton = await page.$x(
      "//button[contains(text(), 'Aceptar pago')]"
    )
    await paymentButton[0].click()
  }
}

module.exports = task
