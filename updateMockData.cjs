const fs = require('fs');
let data = fs.readFileSync('src/data/mockData.js', 'utf8');
let i = 1;
data = data.replace(/\{ id: (.*?),/g, (match, p1) => `{ id: ${p1}, equipNo: 'EQ-${String(1000 + i++)}',`);
fs.writeFileSync('src/data/mockData.js', data);
console.log("Done");
