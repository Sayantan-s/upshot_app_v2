import * as ngrok from '@ngrok/ngrok';
import chalk from 'chalk';
import fs from 'node:fs';

(async function () {
  const FILE_PATH = 'assets/ngrok-url.txt';
  const listener = await ngrok.connect({
    proto: 'http',
    addr: 8080, // replace with your server port
    authtoken_from_env: true,
  });
  console.log(`Ngrok initialized at:: ${chalk.blue(listener.url())}`);
  fs.writeFileSync(FILE_PATH, listener.url());
})();
