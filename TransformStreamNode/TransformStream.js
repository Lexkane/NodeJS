'use strict'
const fs = require('fs');
const http = require('http');
const stream = require('stream');


class ToUpperCaseStream extends stream.Transfrom {
  constructor(options = {}) {
    options = Object.assign({}, options, {decodStrings: false});
    super(options);
  }
  _transform(chunk, encoding, callback) {
    if (encoding != 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'))
      return callback();
    }
    this.push(chunk.toUpperCase());
    callback();
  }
}

//_flush(callback) {
//    this.push('===end===');
//    callback();
//}


fs.createReadStream('./file1.txt', 'utf8')
    .pipe(new ToUpperCaseSteeam())
    .pipe(fs.createWriteStream('./file2.txt'))

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead('400');
    return res.end();
  }
  req.setEncoding('utf8');
  req.pipe(new ToUpperCaseStream()).pipe(res);
});
const PORT = 8080;
server.listen(PORT, () => console.log(`Server listening at ${PORT}`));