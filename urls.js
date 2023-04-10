const fs = require('fs');
const argv = process.argv;
const path = argv[2];
const axios = require('axios');


const readline = require('readline');
function writeToFile(data, url) {
    const fileName = url.split('/')[2];
    fs.writeFile(fileName, data, 'utf8', err => {
        if(err) {
            console.log(`Couldn't write ${fileName}`);
        }
        console.log(`wrote to ${fileName}`);
    })
}

async function getHTML(url) {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        console.log(`Couldn't download ${url}`);
    }
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const htmlContent = await getHTML(line);
    if(htmlContent) {
        writeToFile(htmlContent, line);
    }
  }
}

processLineByLine();

