# donna

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![dependencies Status](https://david-dm.org/muZk/donna/status.svg)](https://david-dm.org/muZk/pinericosas)

# About

Donna is a command line tool built to automate 🇨🇱 Chilean boring tasks such as college loans, taxes and contributions.

# How it works

Donna starts session in the service you want to pay and leaves you right in the final step. What follows for now is not automated.

Behind scenes it uses [puppeteer](https://github.com/GoogleChrome/puppeteer) for the browser automation tool.

# Instalation

```
$ npm install -g donna
```

# Commands

## pay

Want to pay something? Donna will leave you right in the final step (payment).

```
$ donna pay
```

First select one of the available services:

![services](https://user-images.githubusercontent.com/1679496/43802516-fd20636e-9a63-11e8-80e7-e7dc34b692c9.png)

Then, Donna will prompt you to enter your RUT and password for the service:

![auth](https://user-images.githubusercontent.com/1679496/43802502-f399d83e-9a63-11e8-8f0a-f14123265191.png)

Available services:

- SII: [F29](https://www.sii.cl/IVA2000/ayuda.htm) for independent workers.
- Previred: [Contributions](https://www.previred.com/web/previred/) (AFP, Salud)
- Itaú: [CAE](https://www.zonaestudiantes.cl/) (student loan)
