import fs from 'fs';

export type JSONKeyType = string;

export type JSONValueType =
  | string
  | number
  | boolean
  | Array<JSONValueType>
  | JSONType
  | null;

interface JSONType {
  [key: string]: JSONValueType;
}

let db: JSONType = {};

/**
 * Creates a JSON file if it does not already exist.
 * @param path Path to the JSON file.
 */
export const createJsonFile = (path: string): void => {
  if (!fs.existsSync(path)) {
    // Create an empty JSON-file if the file does not
    // already exist.
    fs.writeFileSync(path, JSON.stringify({}));
  }
};

/**
 * Sets a key to a value in a JSON file.
 * @param key Key to update.
 * @param value Value to update the key with.
 * @param path Path to the JSON file.
 */
const setKey = async (
  key: JSONKeyType,
  value: JSONValueType,
  path: string
): Promise<void> =>
  new Promise((resolve) => {
    fs.readFile(path, async (err, data) => {
      if (err) throw err;
      const json: JSONType = JSON.parse(data.toString());
      json[key] = value;
      fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) throw err;
        resolve();
      });
    });
  });

/**
 * Reads a key from a JSON file.
 * @param key Key to read from JSON file.
 * @param path Path to the JSON file.
 * @returns Value of the key.
 */
const getKey = async (key: JSONKeyType, path: string): Promise<JSONValueType> =>
  new Promise((resolve) =>
    fs.readFile(path, async (err, data) => {
      if (err) throw err;
      resolve(JSON.parse(data.toString())[key]);
    })
  );

interface JSONScribeOptions {
  path: string;
}

export default ({
  path = 'db.json',
}: JSONScribeOptions): {
  setKey: (key: JSONKeyType, value: JSONValueType) => Promise<void>;
  getKey: (key: JSONKeyType) => Promise<JSONValueType>;
} => {
  createJsonFile(path);
  db = JSON.parse(fs.readFileSync(path).toString());
  return {
    setKey: (key: JSONKeyType, value: JSONValueType) =>
      setKey(key, value, path),
    getKey: (key: JSONKeyType) => getKey(key, path),
  };
};
