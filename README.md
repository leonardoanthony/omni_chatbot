# 🤖 Omni Chatbot

Assistente automatizado para WhatsApp utilizando a biblioteca [@open-wa/wa-automate](https://openwa.dev/), com integração de múltiplos comandos úteis como CEP, clima, QRCode, Pokémon, cotações da bolsa, assistente nutricional com IA e muito mais.

---

## 📛 Badges

![Node.js](https://img.shields.io/badge/node-%3E%3D16.x-brightgreen)  
![License](https://img.shields.io/badge/license-ISC-blue)  
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

---

## ⚙️ Instalação

> Requisitos:
- Node.js v16+  
- npm  
- WhatsApp com QR Code ativado  
- `.env` com a variável `MISTRAL_API_KEY`

```bash
# Clone o repositório
git clone https://github.com/leonardoanthony/omni_chatbot.git
cd omni_chatbot

# Instale as dependências
npm install

# Crie o arquivo .env com sua chave da Mistral AI
echo "MISTRAL_API_KEY=sua-chave-aqui" > .env

# Execute o bot
node index.js
```

---

## ▶️ Uso

Após iniciar, o bot irá gerar um QRCode para autenticação no WhatsApp. Escaneie com seu celular.

### Exemplos de comandos:

- `!cep 01001000` – Busca informações de um CEP  
- `!qrcode texto ou link` – Gera um QRCode  
- `!pokemon` – Gera um Pokémon aleatório  
- `!pokemon types` – Lista os tipos de Pokémon disponíveis  
- `!cota PETR4` – Retorna a cotação de ações da B3  
- `🎰` – Jogo de caça-níqueis com sistema de moedas internas  
- `!create Nome` – Cadastra usuário (apenas em chats privados)  
- `!info` – Retorna os dados do usuário  
- `!food [alimento]` – Gera uma ficha nutricional usando IA  
- `!clima Recife` – Envia imagem com previsão do tempo

---

## 📁 Estrutura do Projeto

```bash
omni_chatbot/
│
├── index.js                 # Arquivo principal do bot
├── seed.js                  # Utilitário de limpeza de arquivos e pastas
├── package.json             # Dependências e metadata do projeto
├── .env                     # Chave da API da Mistral
│
└── src/
    ├── config/              # Configuração e parse de comandos
    ├── controllers/         # UserController para gerenciar usuários
    ├── modules/             # Módulos por comando (cepapi, qrcode, pokemon, etc)
    └── report/              # Geração de imagem com dados nutricionais
```

---

## 🤝 Contribuição

1. Fork este repositório  
2. Crie uma branch com sua feature: `git checkout -b minha-feature`  
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`  
4. Push para a branch: `git push origin minha-feature`  
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Créditos e Autores

Desenvolvido por [leonardoanthony](https://github.com/leonardoanthony)

---

## 💡 Sugestões de melhoria

- Adicionar testes automatizados  
- Criar documentação detalhada para cada comando em `/docs`  
- Incluir exemplos visuais (GIFs ou prints do WhatsApp)