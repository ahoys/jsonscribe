import fs from 'fs';
import { createJsonFile } from '../index';

describe('createJsonFile', () => {
  it('should create a file if it does not exist', () => {
    // Define the test file path.
    const filePath = './test.sync.json';

    // Remove the test file if it already exists.
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Call the function to create the file.
    createJsonFile(filePath);

    // Assert that the file now exists.
    expect(fs.existsSync(filePath)).toBe(true);

    // Clean up the test file.
    fs.unlinkSync(filePath);
  });

  it('should not create a file if it already exists', () => {
    // Define the test file path.
    const filePath = './test.sync.json';

    // Create the file first.
    fs.writeFileSync(filePath, JSON.stringify({}));

    // Call the function to create the file.
    createJsonFile(filePath);

    // Assert that the file still exists.
    expect(fs.existsSync(filePath)).toBe(true);

    // Clean up the test file.
    fs.unlinkSync(filePath);
  });
});
