// Here, we need to map the plain key-value pairs
// to those where the key is a regular expression
// and the value includes the captured regex value

const moduleNameMapper = Object.assign({}, {
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
  "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
});

module.exports = {
  "verbose": true,
  "moduleNameMapper": moduleNameMapper,
  "moduleFileExtensions": ["js", "jsx"],
  "automock": false,
  "setupFiles": [
      "./setupJest.js"
  ],
  "testURL": 'http://localhost'
};