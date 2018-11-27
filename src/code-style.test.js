const recursive = require("recursive-readdir");
const readFilePromise = require("fs-readfile-promise");

test("indentation should be done with spaces, not tabs", () => {
  return recursive("./src", ["!*.js"]).then(function(files){
    return files.map((file) => {
      return readFilePromise(file, 'utf8').then((contents) => {
        expect(contents).not.toMatch(/\t/g);
      });
    });
  }).then((promises) => {
    return Promise.all(promises);
  });
});
