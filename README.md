Chatbot para Pizzaria Bella Itália
Este projeto implementa um chatbot para a Pizzaria Bella Itália, utilizando o Venom Bot para integração com o WhatsApp e a Google Generative AI para fornecer respostas automáticas aos clientes.
O bot responde perguntas frequentes sobre o cardápio, promoções, horários de funcionamento e outras informações, além de armazenar o histórico de conversas.

Funcionalidades
Responde automaticamente mensagens de clientes via WhatsApp.

Armazena o histórico de conversas por número de telefone.

Utiliza IA para gerar respostas inteligentes baseadas em um treinamento específico sobre a pizzaria.

Tecnologias Utilizadas
Node.js – Ambiente de execução.

JavaScript (ES6) – Linguagem de programação do projeto.

venom-bot – Biblioteca para integração com o WhatsApp.

@google/generative-ai – Biblioteca para usar o modelo Gemini 1.5 Flash da Google AI.

Como Usar

1. Instalar Dependências
   No diretório do projeto, execute:

bash
Copiar
Editar
npm install 2. Configurar a API do Google
Para utilizar a Google Generative AI, é necessário uma chave de API válida.

A configuração da chave é feita diretamente no código:

javascript
Copiar
Editar
const genAI = new GoogleGenerativeAI("SUA-CHAVE-DE-API");
Substitua "SUA-CHAVE-DE-API" pela sua chave pessoal, que pode ser obtida no Google Cloud Console.

3. Inicializar o Projeto
   Após instalar as dependências e configurar a API, inicie o bot com:

bash
Copiar
Editar
node index.js
O bot se conectará automaticamente ao WhatsApp e começará a interagir com os clientes.

Estrutura do Projeto
index.js — Arquivo principal que executa o bot e gerencia as interações no WhatsApp.

banco.js — Banco de dados local (em memória) para armazenar o histórico de conversas.

treinamento.js — Arquivo de treinamento com informações sobre a pizzaria (cardápio, promoções e serviços).

Como Funciona
Ao receber uma mensagem de um cliente no WhatsApp, o bot:

Verifica se já existe um histórico de conversa para aquele número.

Se não existir, inicia um novo chat.

Usa a IA para gerar uma resposta baseada no treinamento específico.

Responde automaticamente e registra a interação no banco de dados em memória.

Armazenamento de Histórico
O histórico de mensagens e respostas é armazenado localmente, em um array de objetos no banco.js.

Cada entrada associa o número de telefone do cliente às suas conversas.

Possíveis Melhorias Futuras
Implementar persistência de dados (em arquivo ou banco de dados real como MongoDB ou MySQL).

Expandir fluxos de conversação para enriquecer a interação com o cliente.

Adicionar funcionalidades como agendamento de pedidos ou entregas.

Melhorar o tratamento de erros e criar respostas personalizadas para falhas.
