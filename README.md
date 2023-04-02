# radb 📦

A tiny JSON "database" for settings and more.

You know how overly complex most of the "lightweight" databases are? Well this ain't. You can set values and you can get values. That's it. No external dependencies.

- Supports TypeScript
- No 3rd-party modules.
- Just plain JSON.
- Requires Node that comes with fs (likely the one you've got installed).

## Install

`npm i radb` or `yarn add radb`

## Example of usage

```
import radb from '../index';

const { setKey, getKey } = radb({ path: './test.json' });

await setKey('key', 123);
const value = await getKey('key');
console.log(value); // 123
```
