const https = require('https');
const fs = require('fs');

https.get('https://raw.githubusercontent.com/wayou/t-rex-runner/master/assets/default_100_percent/100-offline-sprite.png', (res) => {
  res.pipe(fs.createWriteStream('assets/logos/sprite.png'));
  res.on('end', () => console.log('Downloaded sprite!'));
});
