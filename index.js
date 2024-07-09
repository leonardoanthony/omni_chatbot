import { create } from '@open-wa/wa-automate';
import fs from 'fs';
import path from 'path';
import { cepapi } from './src/modules/cepapi/index.js';
import { qrcode } from './src/modules/qrcode/index.js';
import { brapi } from './src/modules/brapi/index.js';
import { slotmachine } from './src/modules/slotmachine/index.js';
import { pokemon } from './src/modules/pokemon/index.js';




create({
  sessionId: "!Robot",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {

  client.onMessage(async message => {
    if (message.body === 'Pai Aldo') {
      await client.sendText(message.from, '✋😞');
    }
  });

  
  client.onMessage(async message => {
    if (message.body === '!help') {
      await client.sendText(message.from, `
      *Principais Comandos:*

!cep _cep apenas números_

!qrcode _texto, link, etc..._

!cota _sigla_

!pokemon

`);
    }
  });



  client.onMessage(async message => {
    if (message.body.slice(0,4) === '!cep' && message.body.length == 13) {
      const cep = Number(message.body.slice(5));
      if(isNaN(cep)){
        await client.sendText(message.from, 'Apenas números');
        return;
      }
      const endereco = await cepapi(cep);
      await client.sendText(message.from, endereco);
    }
  });

  client.onMessage(async message => {
    if (message.body.slice(0,7) === '!qrcode') {
      const info = message.body.slice(8).trim();
      
      const filePath = await qrcode(info);
      const senderNumber = message.author;
      const mention = `@${senderNumber.split('@')[0]}`;
      await client.sendImage(message.from, filePath, 'qrcode.png', `Gerado com sucesso ${mention}`)
      
      fs.unlink(filePath, () => {});
    }
  });

  client.onMessage(async message => {
    if (message.body === '!pokemon' || message.body === '!pokémon') {
      
      const senderNumber = message.author;
      const mention = `@${senderNumber.split('@')[0]}`;

      

      const {image, id, name} = await pokemon();
      await client.sendImage(message.from, image, `${id}.png`, `#${id} - ${name} ${mention}`);

      
      fs.unlink(image, () => {});
    }
  });

  client.onMessage(async message => {
    if (message.body.slice(0,5) === '!cota') {
      const cota = message.body.slice(6).trim().toUpperCase();
      if(cota == ''){
        await client.sendText(message.from, 'Preencha uma cota, exemplo: PETR4, ITSA4');
        return;
      }
      const response = await brapi(cota);
      await client.sendText(message.from, response);
    }
  });

  client.onMessage(async message => {
    if (message.body === '🎰') {
      const result = slotmachine();
      await client.sendText(message.from, result.result);
      await client.sendText(message.from, (result.status) ? 'Parabéns' : 'Não foi dessa vez');
    }
  });



}