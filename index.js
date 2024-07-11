import { create } from '@open-wa/wa-automate';
import fs from 'fs';
import path from 'path';
import { cepapi } from './src/modules/cepapi/index.js';
import { qrcode } from './src/modules/qrcode/index.js';
import { brapi } from './src/modules/brapi/index.js';
import { slotmachine } from './src/modules/slotmachine/index.js';
import { pokemon } from './src/modules/pokemon/index.js';
import startConfigOptions from './src/config/startConfigOptions.js';
import parseCommand from './src/config/parser/index.js';
import { icons } from './src/config/icons.js';
import { UserController } from './src/controllers/UserController.js';



create(startConfigOptions()).then(client => start(client));

function start(client) {

  const { reactions } = icons;

  const handleMsg = (msgText, message) => {
      const parsedMessage = parseCommand(msgText);
      if(parsedMessage.valid){

      }
  }

  client.onMessage(async message => {
    if (message.body.slice(0, 7) === '!create') {
      if (message.isGroupMsg) {
        await client.react(message.id, reactions.error);
        await client.sendText(message.from, 'Usuários só podem ser cadastrados em um chat privado');
      } else {
        client.react(message.id, reactions.loading);
        const controller = new UserController();
        const result = await controller.createUser(message);
        if (result) {
          await client.react(message.id, reactions.success);
          await client.sendText(message.from, 'Usuário cadastrado');
        } else {
          await client.react(message.id, reactions.error);
          await client.sendText(message.from, 'Erro ao cadastrar');
        }
      }
    }
  });


  client.onMessage(async message => {
    if (message.body === 'Pai Aldo') {
      client.react(message.id, '✋');
      await client.sendText(message.from, '✋😞');
    }
  });

  
  client.onMessage(async message => {
    if (message.body === '!help') {
      await client.sendText(message.from, 
`______

--- !Robot ----
Todos os comandos começam com *!*
Seguido do comando e por fim os parametros, quando necessário
_Exemplos_: 
\`!cep 00100100\`
\`!pokemon\`
\`!comando parametroOpcional\`

______

--- CEP ----
Saiba o endereço a partir do cep
_Exemplo_: 
\`!cep 00100100\`

______

--- COTA ----
Saiba a cotação de uma ação do mercado financeiro
_Exemplo_: 
\`!cota petr4\`

______

--- QRCODE ----
Gere um QRCode a partir de um texto ou link
_Exemplo_: 
\`!qrcode meu texto\`
\`!qrcode http://meulink.com\`

______

--- POKEMON ----
Gere um Pokémon aleatório
_Exemplo_: 
\`!pokemon\`

______

--- CAÇA NÍQUEIS ----
Jogue o famoso caça níqueis, se der 3 números iguais, você vence;
_Exemplo_: 
\`🎰\`

______

`);
    }
  });



  client.onMessage(async message => {
    if (message.body.slice(0,4) === '!cep' && message.body.length == 13) {


      await client.react(message.id, reactions.loading)

      const cep = Number(message.body.slice(5));
      if(isNaN(cep)){
        await client.sendText(message.from, 'Apenas números');
        return;
      }
      const endereco = await cepapi(cep);

      if(endereco.erro){
        await client.react(message.id, reactions.error)
        await client.sendText(message.from, 'endereco');
        return;
      }
      
      
      await client.sendText(message.from, endereco);
      await client.react(message.id, reactions.success)
    }
  });

  client.onMessage(async message => {
    if (message.body.slice(0,7) === '!qrcode') {
      await client.react(message.id, reactions.loading)
      const info = message.body.slice(8).trim();

      if(!info){
        await client.react(message.id, reactions.error);
        await client.sendText(message.from, 'comando !qrcode sem parametro');
        return;
      }
      
      const filePath = await qrcode(info);
      const senderNumber = message.author;
      const mention = `@${senderNumber.split('@')[0]}`;
      await client.sendImage(message.from, filePath, 'qrcode.png', `Gerado com sucesso ${mention}`)
      await client.react(message.id, reactions.success);
      
      fs.unlink(filePath, () => {});
    }
  });

  client.onMessage(async message => {
    if (message.body === '!pokemon' || message.body === '!pokémon') {
      await client.react(message.id, reactions.loading)
      
      const senderNumber = message.author;
      const mention = `@${senderNumber.split('@')[0]}`;

      

      const {image, id, name} = await pokemon();
      await client.sendImage(message.from, image, `${id}.png`, `#${id} - ${name} ${mention}`);
      await client.react(message.id, reactions.success)

      
      fs.unlink(image, () => {});
    }
  });

  client.onMessage(async message => {
    if (message.body.slice(0,5) === '!cota') {
      await client.react(message.id, reactions.loading)
      const cota = message.body.slice(6).trim().toUpperCase();
      if(cota == ''){
        await client.react(message.id, reactions.error)
        await client.sendText(message.from, 'Preencha uma cota, exemplo: PETR4, ITSA4');
        return;
      }
      const response = await brapi(cota);
      await client.sendText(message.from, response);
      await client.react(message.id, reactions.success)
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