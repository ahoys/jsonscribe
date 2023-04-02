import fs from 'fs';
import jsonscribe, { JSONScribeFile } from '../index';

const path = './test.getKey.json';

let setKey: JSONScribeFile<string>['setKey'];
let getKey: JSONScribeFile<string>['getKey'];

describe('getKey function', () => {
  beforeAll(async () => {
    const db = jsonscribe<string>({ path });
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
