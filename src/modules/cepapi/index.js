export const cepapi = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(url);
    const endereco = await (await fetch(url)).json();

    if(!endereco){
        return `CEP Invalido, retorne apenas os 8 digitos`;
    }

    return `
    *Rua:* ${endereco.logradouro}
*Bairro:* ${endereco.bairro}
*Cidade:* ${endereco.localidade} - ${endereco.uf}
    `
}

