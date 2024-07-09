export const brapi = async (cota) => {
    const quote = cota.toUpperCase()
    const url = `https://brapi.dev/api/quote/${quote}?token=ghqDkwLSVVnVhCcUCAnywe`;
    const response = await (await fetch(url)).json();

    if(response.error || response.results[0].priceEarnings == null){
        return `Não encontramos a ação ${quote}`;
    }

    const {longName, symbol, regularMarketPrice} = response.results[0];

    const preco = regularMarketPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    return `
*${symbol}:* 
*Empresa:* ${longName}
*Preço:* ${preco}
    `
}

