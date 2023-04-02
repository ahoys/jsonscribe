import fs from 'fs';
import radb, { JSONValueType } from '../index';

const path = './test.setKey.json';

let setKey: (key: string, value: JSONValueType) => Promise<void>;

describe('setKey function', () => {
  beforeAll(() => {
    const db = radb({ path });
    setKey = db.setKey;
  });

  afterAll(() => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });

  it('should update the value of the key in the JSON file', async () => {
    // Arrange
    const key = 'name';
    const value = 'John';

    // Act
    await setKey(key, value);

    // Assert
    const data = await fs.promises.readFile(path);
    const json = JSON.parse(data.toString());
    expect(json[key]).toEqual(value);
  });

  it('another key should not replace the previous one', async () => {
    // Arrange
    const key = 'another';
    const value = 'Mary';

    // Act
    await setKey(key, value);

    // Assert
    const data = await fs.promises.readFile(path);
    const json = JSON.parse(data.toString());
    expect(json[key]).toEqual(value);
  });
});
