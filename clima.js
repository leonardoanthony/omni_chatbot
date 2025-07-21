import axios from 'axios';

export async function obterClimaWhatsapp(cidade) {
  const API_KEY = 'apikey';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${API_KEY}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod !== 200) {
    return { erro: `❌ Erro ao obter clima: ${data.message}` };
  }

  const {
    weather,
    main,
    wind,
    visibility,
    sys,
    name
  } = data;

  const condicao = weather[0].main;
  const descricao = weather[0].description;
  const temperatura = main.temp.toFixed(1);
  const sensacao = main.feels_like.toFixed(1);
  const umidade = main.humidity;
  const vento = wind.speed.toFixed(1);
  const direcaoVento = wind.deg;
  const pressao = main.pressure;
  const visibilidade = (visibility / 1000).toFixed(1);
  const nascerSol = new Date(sys.sunrise * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const porSol = new Date(sys.sunset * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const codigoIcone = weather[0].icon;
  const iconeURL = `https://openweathermap.org/img/wn/${codigoIcone}@4x.png`;

  const mensagem = `
*Previsão do Tempo - ${name}*  
📍 Localização: ${name}
☁️ Condição: *${descricao}*
🌡 Temperatura: *${temperatura}°C*
🤒 Sensação térmica: *${sensacao}°C*
💧 Umidade: *${umidade}%*
💨 Vento: *${vento} km/h* (direção ${direcaoVento}°)
🔍 Visibilidade: *${visibilidade} km*
🔺 Pressão atmosférica: *${pressao} hPa*

🌅 Nascer do sol: *${nascerSol}*  
🌇 Pôr do sol: *${porSol}*

🔁 Atualizado agora pela OpenWeather
`.trim();

  // Baixa a imagem do ícone como base64
  const imagemBuffer = await axios.get(iconeURL, { responseType: 'arraybuffer' });
  const base64Image = Buffer.from(imagemBuffer.data).toString('base64');
  const mimeType = 'image/png'; // sempre PNG

  return {
    image: `data:${mimeType};base64,${base64Image}`,
    caption: mensagem
  };
}



// teste
