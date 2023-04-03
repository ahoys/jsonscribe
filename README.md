# jsonscribe 📦

A tiny JSON "database" for settings and more.

You know how overly complex most of the "lightweight" databases are? Well this ain't. You can set values and you can get values. That's it. No external dependencies.

- Supports TypeScript
- No 3rd-party modules.
- Just plain JSON.
- Requires Node that comes with fs (likely the one you've got installed).

## Install

`npm i jsonscribe` or `yarn add jsonscribe`

## Example of usage

```
import jsonscribe from '../index';

const { setKey, getKey } = jsonscribe({ path: './test.json' });

setKey('key', 123);
const value = getKey('key');
console.log(value); // 123
```
