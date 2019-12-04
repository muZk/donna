# donna

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/muZk/donna.svg?branch=master)](https://travis-ci.org/muZk/donna)
[![dependencies Status](https://david-dm.org/muZk/donna/status.svg)](https://david-dm.org/muZk/donna)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## About

Donna is a command line tool built to automate 🇨🇱 Chilean boring tasks such as college loans, taxes and contributions.

## How it works

Donna starts session in the service you want to pay and leaves you right in the final step. What follows for now is not automated.

Behind scenes it uses [puppeteer](https://github.com/GoogleChrome/puppeteer) for the browser automation tool.

## Instalation

```
$ npm install -g donna-bot
```

## Commands

### pay

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

#### Optional arguments

**Service**:

If you don't want to manually select the service you want to pay, you can use the `service` argument.

For example:

```
$ donna pay -s sii
```

Available services: `sii` and `previred`

**RUT**

_rut_ can be specified with `RUT` environment variable.

**Password**

The service password can be specified with an environment variable:

- SII_PASSWORD
- PREVIRED_PASSWORD

## Available Services

### SII

You can use this bot to **automatically pay** your SII contributions. The only "inconvenient" is that you MUST use [**PEC** payment](http://www.sii.cl/portal_renta/como_pagar/pagar_declaracion_internet.htm#3).

How you can pay with **PEC**? You can read more [here](https://medium.com/p/9c63604d8e86). Then just run the `donna pay -s sii` command with your SII credentials or just use environment variables.

### Previred

Not working at the moment 😂 but it wasn't fully automated (yet).
