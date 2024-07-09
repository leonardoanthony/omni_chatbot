export default function parseCommand(text) {
    // Verifica se o texto começa com "!"
    if (!text.startsWith('!')) {
      return false;
    }
  
    // Remove o "!" inicial e divide o texto em partes
    const parts = text.substring(1).split(' ');
  
    // O primeiro elemento é o comando
    const command = parts.shift();
  
    // Verifica se o comando não está vazio
    if (!command) {
      return false;
    }
  
    // Inicializa um objeto para os parâmetros ou uma string para o texto corrido
    let params = {};
    let currentKey = null;
  
    // Verifica se há partes restantes
    if (parts.length > 0) {
      // Itera sobre as partes restantes para identificar os parâmetros e seus valores
      for (const part of parts) {
        if (part.startsWith('-')) {
          // Se a parte começar com "-", é uma chave de parâmetro
          currentKey = part.substring(1);
          params[currentKey] = '';
        } else if (currentKey) {
          // Caso contrário, é um valor para a chave de parâmetro atual
          params[currentKey] += params[currentKey] ? ` ${part}` : part;
        } else {
          // Se não houver chaves, trata o texto corrido como um único parâmetro
          params = parts.join(' ');
          break;
        }
      }
    } else {
      // Se não houver partes restantes, params permanece um objeto vazio
      params = '';
    }
  
    return {
      valid: true,
      command: command,
      params: params
    };
  }