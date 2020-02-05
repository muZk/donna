const puppeteer = require('puppeteer')
const Promise = require('bluebird')

const LOGIN =
  'https://zeusr.sii.cl//AUT2000/InicioAutenticacion/IngresoRutClave.html'
const F29 = 'https://www4.sii.cl/propuestaf29ui/index.html'
const BANK_IMG =
  '/html/body/div[6]/div/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[7]/td/div/div[3]/div/img'

async function task (rut, password) {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  console.info('Logging in SII...')
  await page.goto(LOGIN)
  await page.type('#rutcntr', rut)
  await page.type('#clave', password)
  page.click('#myform button')
  await page.waitForNavigation()
  console.info('Logged in!')
  console.info('Opening F29...')
  await page.goto(F29)
  await page.waitForSelector('button.btn-primary:not([disabled])')
  console.info('Clicking "Aceptar" button...')
  page.click('button.btn-primary')
  await page.waitForNavigation()

  await page.waitForSelector(
    'button.gwt-Button.imagenBtnValidar:not([disabled])',
    {
      visible: true
    }
  )

  // I had to add this timeout because clicking the button was not working...
  await Promise.delay(3000)

  console.log('Clicking "Enviar declaración" button...')
  page.click('button.gwt-Button.imagenBtnValidar:not([disabled])')

  console.log('Waiting for "#gwt-uid-18" button...')
  await Promise.delay(1000)
  await page.waitForSelector('#gwt-uid-18', { visible: true })

  console.log('Clicking "#gwt-uid-18" button...')
  await Promise.delay(3000)
  page.click('#gwt-uid-18')

  console.log('Selecting payment mode...')

  const pecRadioInput = await page.$x(
    '/html/body/div[6]/div/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[8]/td/table/tbody/tr/td/table/tbody/tr[3]/td[1]/span/input'
  )
  await pecRadioInput[0].click()

  // 1 = pago inmediato, 0 = pago al vencimiento
  await page.select('.gwt-ListBox:first-child', '1')

  console.log('Waiting for "Continuar" button...')
  const continueButton = await page.$x(
    "//button[contains(text(), 'Continuar')]"
  )
  if (continueButton.length === 1) {
    console.log('Continue button found, clicking it')
    await continueButton[0].click()
    console.log('Waiting for BANK_IMAGE to appear')
    await page.waitForXPath(BANK_IMG, { visible: true })
    const img = await page.$x(BANK_IMG)
    console.log('Selecting bank to pay...')
    await img[0].click()
    console.log('Clicking "Aceptar pago"')
    const paymentButton = await page.$x(
      "//button[contains(text(), 'Aceptar pago')]"
    )
    await paymentButton[0].click()
  }
}

module.exports = task
