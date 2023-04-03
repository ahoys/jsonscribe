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
function setKey<T>(key: string, value: T, path: string): void {
  const data = fs.readFileSync(path);
  if (data) {
    const json = JSON.parse(data.toString());
    json[key] = value;
    fs.writeFileSync(path, JSON.stringify(json));
  }
}

/**
 * Reads a key from a JSON file.
 * @param key Key to read from JSON file.
 * @param path Path to the JSON file.
 * @returns Value of the key.
 */
function getKey<T>(key: string, path: string): T {
  const file = fs.readFileSync(path);
  return JSON.parse(file.toString())[key];
}

export interface JSONScribeFile<T> {
  setKey: (key: string, value: T) => void;
  getKey: (key: string) => T | undefined;
}

interface JSONScribeOptions {
  path: string;
}

function jsonscribe<T>({
  path = 'db.json',
}: JSONScribeOptions): JSONScribeFile<T> {
  createJsonFile(path);
  return {
    setKey: (key: string, value: T) => setKey<T>(key, value, path),
    getKey: (key: string): T | undefined => getKey<T>(key, path),
  };
}

export default jsonscribe;
