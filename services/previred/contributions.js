const puppeteer = require('puppeteer')

const LOGIN = 'https://www.previred.com/wPortal/login/login.jsp'
const PAYMENT = 'https://www.previred.com/wPersonas/CtrlFce'

async function task (rut, password) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(LOGIN)
  await page.type('#web_rut2', rut)
  await page.type('#web_password', password)
  page.click('#login')
  await page.waitForNavigation()
  await page.goto(PAYMENT)
}

module.exports = task
