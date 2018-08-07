const puppeteer = require('puppeteer')

const LOGIN = 'https://www.zonaestudiantes.cl'

async function task (rut, password) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(LOGIN)
  await page.type('#USR_RUT', rut)
  await page.type('#USR_PASS', password)
  page.click('#LOGIN_BTN')
  await page.waitForNavigation()
  await page.click('button.navbar-toggle')
  page.click('#btn_datos8_responsivo')
  await page.waitForSelector('input.first_item', { visible: true })
  page.click('input.first_item')
  await page.waitForSelector('#btnPago', { visible: true })
  const openPopupPromise = new Promise(resolve =>
    browser.on('targetcreated', resolve)
  )
  page.click('#btnPago')
  await openPopupPromise
  const pages = await browser.pages()
  const confirmPage = pages[pages.length - 1]
  confirmPage.click('#btnPago')
}

module.exports = task
