## Coopa

[![Build Status](https://github.com/kefniark/Coopa/workflows/Build%20CI/badge.svg)](https://github.com/kefniark/Coopa/actions)
[![NPM Version](https://img.shields.io/npm/v/coopa.svg)](https://npmjs.org/package/coopa)
[![NPM Download](https://img.shields.io/npm/dm/coopa.svg)](https://npmjs.org/package/coopa)
[![Coverage Status](https://coveralls.io/repos/github/kefniark/Coopa/badge.svg?branch=master)](https://coveralls.io/github/kefniark/Coopa?branch=master)
[![License](https://img.shields.io/npm/l/coopa.svg)](https://npmjs.org/package/coopa)

A really simple and reliable Typescript utility library compatible with Tree Shaking

Originally just for personal use, a bit tired to copy/paste code between project in a `helpers.js` or to have crazy dependencies for any basic feature.

Export with Rollup in:
* ESM: the default modern version (compatible with tree shaking)
* CommonJS: fallback for old node / tools

___

## API

* [Algorithm](./src/algorithm/Readme.md)
* [Geometry](./src/geometry/Readme.md)
* [HTML](./src/html/Readme.md)
* [Utils](./src/utils/Readme.md)
* [Extensions](./src/utils/extension/Readme.md)

___

## Dev

Automatically rebuild code on changed and start a local server with samples on `localhost:8085`
```
npm run dev
```

If you want to work on sample, I recommend using:
```
npm run dev:livereload
```
This command will automatically reload the browser when samples are edited