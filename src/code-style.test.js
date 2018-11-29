const recursive = require('recursive-readdir');
const readFilePromise = require('fs-readfile-promise');

test('indentation should be done with spaces, not tabs', () => recursive('./src', ['!*.js']).then(files => files.map(file => readFilePromise(file, 'utf8').then((contents) => {
  expect(contents).not.toMatch(/\t/g);
}))).then(promises => Promise.all(promises)));
