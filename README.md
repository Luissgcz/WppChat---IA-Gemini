# Chatbot para Pizzaria Bella Itália

Este projeto implementa um chatbot para a **Pizzaria Bella Itália** utilizando o **Venom Bot** para integração com o WhatsApp e a **Google Generative AI** para fornecer respostas automatizadas aos clientes da pizzaria. O bot responde a perguntas frequentes sobre o cardápio, promoções, horários de funcionamento, entre outras informações, além de armazenar o histórico de chats.

## Funcionalidades:
- Responde automaticamente às mensagens dos clientes via WhatsApp.
- Armazena o histórico de chats por número de telefone.
- Utiliza a API do Google para gerar respostas inteligentes baseadas em um treinamento específico sobre a pizzaria.

## Tecnologias Utilizadas:
- **venom-bot**: Biblioteca para integrar o bot com o WhatsApp.
- **@google/generative-ai**: Biblioteca para usar o modelo **Gemini 1.5 Flash** da Google AI.
- **Node.js**: Ambiente de execução do código.
- **JavaScript/ES6**: Linguagem de programação utilizada para o desenvolvimento do bot.

## Como Usar:

### 1. Instalar Dependências:
Antes de executar o projeto, instale as dependências necessárias utilizando o `npm`. No diretório do projeto, execute o comando:

npm install
2. Configurar a API do Google:
Para usar a API Google Generative AI, você precisará de uma chave de API válida. Faça o seguinte:

A chave da API está configurada diretamente no código:
const genAI = new GoogleGenerativeAI("SUA-CHAVE-DE-API");
Substitua "SUA-CHAVE-DE-API" pela sua chave de API pessoal, que pode ser obtida na Google.

3. Inicializar o Projeto:
Com as dependências instaladas e a chave de API configurada, inicie o projeto com o comando:
node index.js

4. Estrutura do Projeto:
index.js: Arquivo principal que executa o bot e lida com as interações via WhatsApp.

banco.js: Arquivo que contém o banco de dados local para armazenar o histórico de consultas de clientes.

treinamento.js: Arquivo contendo o treinamento inicial para o chatbot, com informações sobre a pizzaria, cardápio, promoções e serviços.

5. Como Funciona:
O bot começa a funcionar assim que recebe uma mensagem de um usuário via WhatsApp.

Ele verifica se já existe um histórico de conversas para o número de telefone do usuário.

Se o chat ainda não foi iniciado, ele cria um novo chat com o modelo de IA.

O modelo de IA gera uma resposta com base na mensagem recebida e o bot a envia de volta ao cliente.

O histórico das conversas (mensagens e respostas) é armazenado localmente no banco de dados em memória (banco.js).

6. Armazenamento de Histórico:
O histórico das interações com os clientes é armazenado em um banco de dados simples (um array em memória), onde são registradas as mensagens dos usuários e as respostas do bot.

7. Possíveis Melhorias:
Implementar persistência do banco de dados (Utilizando um DB Real (MySQL | Postgres).

Adicionar mais interações e fluxos de conversa para melhorar a experiência do usuário.

Melhorar o tratamento de erros e personalizar as respostas automáticas em caso de falhas.

Adicionar funcionalidades como agendamento de entregas ou pedidos online.
