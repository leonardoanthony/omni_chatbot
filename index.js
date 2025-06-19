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
import { Mistral } from '@mistralai/mistralai';
import { obterClimaWhatsapp } from './clima.js';


create(startConfigOptions()).then(client => start(client));

function start(client) {

  const { reactions, profiles, pokeTypes } = icons;

  const handleMsg = (msgText, message) => {
      const parsedMessage = parseCommand(msgText);
      if(parsedMessage.valid){

      }
  }

  // client.onMessage(async message => {
  //   if (message.body.slice(0, 7) === '!create') {
  //     if (message.isGroupMsg) {
  //       await client.react(message.id, reactions.error);
  //       await client.sendText(message.from, 'Usuários só podem ser cadastrados em um chat privado');
  //     } else {
  //       client.react(message.id, reactions.loading);
  //       const controller = new UserController();
  //       const result = await controller.createUser(message);
  //       if (result) {
  //         await client.react(message.id, reactions.success);
  //         await client.sendText(message.from, 'Usuário cadastrado');
  //       } else {
  //         await client.react(message.id, reactions.error);
  //         await client.sendText(message.from, 'Erro ao cadastrar');
  //       }
  //     }
  //   }
  // });

//   client.onMessage(async message => {
//     if (message.body === '!info') {
      
//         client.react(message.id, reactions.loading);

//         const controller = new UserController();

//         const result = await controller.getUser(message);

//         if(result.error){
//           await client.react(message.id, reactions.error);
//           await client.sendText(message.from, result.message, message.id);
//           return;
//         }

       
//           await client.react(message.id, reactions.success);
//           await client.sendText(message.from, 
//             `______

// --- *!INFO* ----
// *Nome:* ${result.name}
// *Perfil:* ${profiles[result.profile]} ${result.profile}
// *Coins:* ₡ ${result.coins}

// ______
// `);
        
//     }
//   });

  
//   client.onMessage(async message => {
//     if (message.body === '!help') {
//       await client.sendText(message.from, 
// `______

// --- !Robot ----
// Todos os comandos começam com *!*
// Seguido do comando e por fim os parametros, quando necessário
// _Exemplos_: 
// \`!cep 00100100\`
// \`!pokemon\`
// \`!comando parametroOpcional\`

// ______

// --- CEP ----
// Saiba o endereço a partir do cep
// _Exemplo_: 
// \`!cep 00100100\`

// ______

// --- COTA ----
// Saiba a cotação de uma ação do mercado financeiro
// _Exemplo_: 
// \`!cota petr4\`

// ______

// --- QRCODE ----
// Gere um QRCode a partir de um texto ou link
// _Exemplo_: 
// \`!qrcode meu texto\`
// \`!qrcode http://meulink.com\`

// ______

// --- POKEMON ----
// Gere um Pokémon
// _Exemplo_: 
// \`!pokemon\`  para gerar um aleatório
// \`!pokemon types\`

// ______

// --- CAÇA NÍQUEIS ----
// Jogue o famoso caça níqueis, se der 3 números iguais, você vence;
// _Exemplo_: 
// \`🎰\`

// ______

// --- CADASTROS USUARIO ----
// Para funcionalidades avançadas
// _Exemplo_: 
// - Para cadastrar-se ( apenas no chat privado )
// \`!create _Seu Nome_\`
// - Para saber suas informações 
// \`!info\`

// ______

// `);
//     }
//   });


//   client.onMessage(async message => {
//     if (message.body.slice(0,4) === '!cep' && message.body.length == 13) {


//       await client.react(message.id, reactions.loading)

//       const cep = message.body.slice(5);
//       if(isNaN(Number(cep))){
//         await client.sendText(message.from, 'Apenas números');
//         return;
//       }
//       const endereco = await cepapi(String(cep));

//       if(endereco.erro){
//         await client.react(message.id, reactions.error)
//         await client.sendText(message.from, 'endereco');
//         return;
//       }
      
      
//       await client.sendText(message.from, endereco);
//       await client.react(message.id, reactions.success)
//     }

//     if(message.body.slice(0,5) === '!food'){

//       await client.react(message.id, reactions.loading)
      
//       const food = message.body.slice(5).trim();
      
//       if(food == ''){
//         await client.react(message.id, reactions.error);
//         await client.sendText(message.from, 'Escreva um alimento');
//         return;
//       }

//       const apiKey = process.env.MISTRAL_API_KEY;

//       const bot = new Mistral({apiKey: apiKey});

//       const chatResponse = await bot.chat.complete({
//         model: 'mistral-small-latest',
//         messages: [
//           {
//             role: 'system',
//             content: `
//               Você é um assistente nutricional.
//               Sempre que o usuário mencionar um alimento, responda com uma FICHA TÉCNICA no seguinte formato (não explique nada, apenas retorne a ficha):

//               📄 FICHA TÉCNICA – [NOME DO ALIMENTO] (descrição, quantidade padrão)

//               🔋 Calorias: 🟨 [valor] kcal
//               💪 Proteínas: 🍗 [valor] g
//               ⚡ Gorduras totais: 🧈 [valor] g
//                 • Saturadas: [valor] g
//                 • Monoinsaturadas: [valor] g
//                 • Poli-insaturadas: [valor] g
//               🥚 Colesterol: 🩺 [valor] mg
//               🌾 Carboidratos: 🟦 [valor] g
//               🧂 Sódio: [valor] mg

//               Substitua os valores com base no alimento informado. Mantenha os emojis e a formatação exatamente como no exemplo acima.
//                     `
//           },
//           {
//             role: 'user',
//             content: food
//           }
//         ],
//       });

//       await client.react(message.id, reactions.success);

//       console.log('Chat:', chatResponse.choices[0].message.content);

//       await client.sendText(message.from, chatResponse.choices[0].message.content);
//       }

//       if(message.body.slice(0,9) === '!training'){

//       await client.react(message.id, reactions.loading)
      
//       const treino = message.body.slice(9).trim();
      
//       if(treino == ''){
//         await client.react(message.id, reactions.error);
//         await client.sendText(message.from, 'Escreva um alimento');
//         return;
//       }

//       const apiKey = process.env.MISTRAL_API_KEY;

//       const bot = new Mistral({apiKey: apiKey});

//       const chatResponse = await bot.chat.complete({
//         model: 'mistral-small-latest',
//         messages: [
//           {
//             role: 'system',
//             content: `
//               Você é um assistente nutricional.
//               Sempre que o usuário mencionar um alimento, responda com uma FICHA TÉCNICA no seguinte formato (não explique nada, apenas retorne a ficha):

//               📄 FICHA TÉCNICA – [NOME DO ALIMENTO] (descrição, quantidade padrão)

//               🔋 Calorias: 🟨 [valor] kcal
//               💪 Proteínas: 🍗 [valor] g
//               ⚡ Gorduras totais: 🧈 [valor] g
//                 • Saturadas: [valor] g
//                 • Monoinsaturadas: [valor] g
//                 • Poli-insaturadas: [valor] g
//               🥚 Colesterol: 🩺 [valor] mg
//               🌾 Carboidratos: 🟦 [valor] g
//               🧂 Sódio: [valor] mg

//               Substitua os valores com base no alimento informado. Mantenha os emojis e a formatação exatamente como no exemplo acima.
//                     `
//           },
//           {
//             role: 'user',
//             content: food
//           }
//         ],
//       });

//       await client.react(message.id, reactions.success);

//       console.log('Chat:', chatResponse.choices[0].message.content);

//       await client.sendText(message.from, chatResponse.choices[0].message.content);
//       }
//   });

//   client.onMessage(async message => {
//     if (message.body.slice(0,7) === '!qrcode') {
//       await client.react(message.id, reactions.loading)
//       const info = message.body.slice(8).trim();

//       if(!info){
//         await client.react(message.id, reactions.error);
//         await client.sendText(message.from, 'comando !qrcode sem parametro');
//         return;
//       }
      
//       const filePath = await qrcode(info);
//       const senderNumber = message.author;
//       const mention = `@${senderNumber.split('@')[0]}`;
//       await client.sendImage(message.from, filePath, 'qrcode.png', `Gerado com sucesso ${mention}`)
//       await client.react(message.id, reactions.success);
      
//       fs.unlink(filePath, () => {});
//     }
//   });

//   client.onMessage(async message => {
//     if (message.body.slice(0,8) === '!pokemon' || message.body.slice(0,8) === '!pokémon') {
//       await client.react(message.id, reactions.loading)
      
//       const senderNumber = message.author;
//       const mention = `@${senderNumber.split('@')[0]}`;

//       const search = message.body.slice(8).trim().toLowerCase();

//       if (search === 'types' || search === 'types') {
//         await client.react(message.id, reactions.loading)
        
//         const response =  Object.entries(pokeTypes).map(([index, icon]) => {
//           return `*${index}:* ${icon}\n`;
//         }).join(` `);
        
//         await client.sendText(message.from, response);
//         await client.react(message.id, reactions.success)
//         return;
//       }


//       const pokemonResponse = await pokemon(search);

//       console.log('pokemonResponse', pokemonResponse);

//       if(!pokemonResponse){
//         await client.sendText(message.from, `#404 - Not Fount`);
//         await client.react(message.id, reactions.error);
//         console.log('notfound');
//         return 
//       }

//       const {image, id, name, types} = pokemonResponse;
      
//       console.log('image');
//       await client.sendImage(message.from, image, `${id}.png`, `#${id} - ${name} ${mention} - ${types}`);
//       console.log('react');
//       await client.react(message.id, reactions.success)
      
      
//       console.log('delete');
//       fs.unlink(image, () => {});
//     }
//   });



//   client.onMessage(async message => {
//     if (message.body.slice(0,5) === '!cota') {
//       await client.react(message.id, reactions.loading)
//       const cota = message.body.slice(6).trim().toUpperCase();
//       if(cota == ''){
//         await client.react(message.id, reactions.error)
//         await client.sendText(message.from, 'Preencha uma cota, exemplo: PETR4, ITSA4');
//         return;
//       }
//       const response = await brapi(cota);
//       await client.sendText(message.from, response);
//       await client.react(message.id, reactions.success)
//     }
//   });

//   client.onMessage(async message => {
//     if (message.body === '🎰') {

//       await client.react(message.id, reactions.loading);

//       const controller = new UserController();

//       const result = await controller.getUser(message);

//       if(result.error){ 
//         await client.react(message.id, reactions.error);
//         await client.sendText(message.from, 'Apenas usuários cadastrados podem jogar!');
//         return;
//       }

//       const slot = slotmachine();
//       await client.sendText(message.from, slot.result);

//       if(slot.status){
//         const premio = 50;
//         const newAmount = result.coins + premio;
//         await controller.setCoins(message, newAmount);
//         await client.react(message.id, reactions.success);
//         await client.sendText(message.from, '*Parabéns!* _+ ₡50_');
//       }else{
//         await client.react(message.id, reactions.error);
//         await client.sendText(message.from, 'Não foi dessa vez');
//       }



//     }
//   });

  client.onMessage(async message => {
    if (message.body.toLowerCase().trim() === 'pai aldo') {

      
      await client.sendContact(message.from, '558197518847@c.us');
      await client.react(message.id, '✋');


    }
  });

  
  client.onMessage(async message => {
    if (message.body.slice(0, 6) === '!clima') {

      await client.react(message.id, reactions.loading);

      const cidade = message.body.slice(7).trim();

      if(cidade == ''){
        await client.sendText(message.from, 'Selecione uma cidade. Ex. _Recife_');
        await client.react(message.id, reactions.error)
        return;
      }  
      
      // const response = await obterClimaWhatsapp(cidade);

      // await client.sendText(message.from, response);

      const { image, caption } = await obterClimaWhatsapp(cidade);

      // client: sua instância do wa-automate
      await client.sendImage(
        message.from, // número com DDI e @c.us
        image,
        'icone-clima.png',
        caption
      );
      await client.react(message.id, reactions.success);
      return;
    
    }
  });






}