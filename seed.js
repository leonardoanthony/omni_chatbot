import fs from 'fs';
import path from 'path';

export const init = () => {

        if (fs.existsSync('!Robot.data.json')) {
            // Remove o arquivo
            fs.unlink('!Robot.data.json', (err) => {
                if (err) {
                    console.error('Erro ao excluir o arquivo:', err);
                } else {
                    console.log('Arquivo excluído com sucesso!');
                }
            });
        } else {
            console.log('O arquivo não existe na raiz do projeto.');
        }
        if (fs.existsSync('_IGNORE_!Robot')) {
            fs.readdirSync('_IGNORE_!Robot').forEach((file, index) => {
                const curPath = path.join('_IGNORE_!Robot', file);
                if (fs.lstatSync(curPath).isDirectory()) { // Se for diretório, chama a função recursivamente
                    removerDiretorioRecursivo(curPath);
                } else { // Se for arquivo, exclui
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync('_IGNORE_!Robot'); // Remove o diretório vazio após esvaziar
            console.log(`Pasta ${'_IGNORE_!Robot'} excluída com sucesso.`);
        } else {
            console.log(`O diretório ${'_IGNORE_!Robot'} não existe.`);
        }

        function removerDiretorioRecursivo(caminhoDiretorio) {
            if (fs.existsSync(caminhoDiretorio)) {
                fs.readdirSync(caminhoDiretorio).forEach((file, index) => {
                    const curPath = path.join(caminhoDiretorio, file);
                    if (fs.lstatSync(curPath).isDirectory()) { // Se for diretório, chama a função recursivamente
                        removerDiretorioRecursivo(curPath);
                    } else { // Se for arquivo, exclui
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(caminhoDiretorio); // Remove o diretório vazio após esvaziar
                console.log(`Pasta ${caminhoDiretorio} excluída com sucesso.`);
            } else {
                console.log(`O diretório ${caminhoDiretorio} não existe.`);
            }
        }
        
        // Exemplo de uso:
        const nomePasta = '_IGNORE_!Robot'; // Substitua pelo nome da pasta que deseja excluir recursivamente
        removerDiretorioRecursivo(nomePasta);

}