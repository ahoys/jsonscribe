import fs from 'fs';
import jsonscribe, { JSONValueType } from '../index';

const path = './test.getKey.json';

let setKey: (key: string, value: JSONValueType) => Promise<void>;
let getKey: (key: string) => Promise<JSONValueType>;

describe('getKey function', () => {
  beforeAll(async () => {
    const db = jsonscribe({ path });
    setKey = db.setKey;
    getKey = db.getKey;
    await setKey('name', 'John');
  });

  afterAll(() => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });

  it('should get the value of the key from the JSON file', async () => {
    // Arrange
    const key = 'name';
    const value = 'John';

    // Act
    const result = await getKey(key);

    // Assert
    expect(result).toEqual(value);
  });
});
