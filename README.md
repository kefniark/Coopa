# Coopa

A really simple and reliable Typescript utility library compatible with Tree Shaking

* [**Samples**](https://kefniark.github.io/Coopa/samples/)
* [**API Documentation**](./src/Readme.md)

[![Build Status](https://github.com/kefniark/Coopa/workflows/Build%20CI/badge.svg)](https://github.com/kefniark/Coopa/actions)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/kefniark/Coopa.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kefniark/Coopa/alerts/)
[![NPM Version](https://img.shields.io/npm/v/coopa.svg)](https://npmjs.org/package/coopa)
[![NPM Download](https://img.shields.io/npm/dm/coopa.svg)](https://npmjs.org/package/coopa)
[![Coverage Status](https://coveralls.io/repos/github/kefniark/Coopa/badge.svg?branch=master)](https://coveralls.io/github/kefniark/Coopa?branch=master)
[![License](https://img.shields.io/npm/l/coopa.svg)](https://npmjs.org/package/coopa)

Originally just for personal use, a bit tired to copy/paste code between project in a `helpers.js` or to have crazy dependencies for any basic feature.

Export with Rollup in:
* **ESM**: the default modern version (compatible with tree shaking)
* **UMD**: fallback for old node / tools (both browser & nodeJS)

___

## Usage

To install
```
npm install coopa
```

and use

```ts
import { uid } from "coopa"

uid() // -> "KCSNPPDr"
```

Test online with [RunKit](https://runkit.com/embed/b74otegzaeba)

___

## Development

### Getting Started
Automatically rebuild code on changed and start a local server with samples on `localhost:8085`
```sh
npm run dev
```

If you want to work on sample, I recommend using in another termin:
```sh
npm run dev:livereload
```
This command will automatically reload the browser when samples are edited

### Commands

```sh
npm run help # provide the list of available commands

npm run autofix # try to use both eslint & prettier autofix feature
npm run test # run unit tests, lint, ...
npm run build # build the project in both ESM (default) & UMD (compatibility)
npm run coverage # build coverage in ./coverage/
npm run update # let update project dependencies
```