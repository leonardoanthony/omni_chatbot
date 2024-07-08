export const brapi = async (cota) => {
    const url = `https://brapi.dev/api/quote/${cota.toUpperCase()}?token=ghqDkwLSVVnVhCcUCAnywe`;
    const response = await (await fetch(url)).json();

    if(response.error){
        return response.message;
    }

    const {longName, symbol, regularMarketPrice} = response.results[0];

    const preco = regularMarketPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    return `
*${symbol}:* 
*Empresa:* ${longName}
*Preço:* ${preco}
    `
}

