const recursive = require("recursive-readdir");
const readFilePromise = require("fs-readfile-promise");

expect.extend({
  toHavePropTypesDefined(received, argument) {
    const file = received[0];
    const contents = received[1];
    const pass = contents.indexOf("static propTypes") !== -1;

    if (pass) {
      return {
        message: () => `expected ${file} not to contain a propTypes definition`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${file} to contain a propTypes definition`,
        pass: false,
      };
    }
  }
});



test("all class-based components define proptypes", () => {
  return recursive("/usr/src/app/src/components", ["!*.js", '*.test.js']).then(function(files){
    return files.map((file) => {
      return readFilePromise(file, 'utf8').then((contents) => {
        if (contents.indexOf("export default class") !== -1 &&
            contents.indexOf("extends Component") !== -1) {
          expect([file, contents]).toHavePropTypesDefined();
        }
      });
    });
  }).then((promises) => {
    return Promise.all(promises);
  });
});


test("indentation should be done with spaces, not tabs", () => {
  return recursive("/usr/src/app/src", ["!*.js"]).then(function(files){
    return files.map((file) => {
      return readFilePromise(file, 'utf8').then((contents) => {
        expect(contents).not.toMatch(/\t/g);
      });
    });
  }).then((promises) => {
    return Promise.all(promises);
  });
});
