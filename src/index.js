const venom = require("venom-bot");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const banco = require("./banco");
const treinamento = require("./treinamento");
const { apiKey } = require("./api");

// Historico por Numeror de Telefone
const chatsUsuarios = new Map();

// Instância do Google Generative AI fora do onMessage para evitar recriação repetida
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const start = (client) => {
  client.onMessage(async (message) => {
    try {
      // Verifica se já existe um chat para esse número
      let chat = chatsUsuarios.get(message.from);

      if (!chat) {
        chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: treinamento }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 200,
          },
        });

        // Salva o chat iniciado
        chatsUsuarios.set(message.from, chat);
      }

      const prompt = message.body;
      const result = await chat.sendMessage(prompt);
      const text = await result.response.text();

      console.log("Resposta do bot:", text);

      // Armazenar histórico de consulta no banco
      const existingHistory = banco.db.find(
        (entry) => entry.numeroTelefone === message.from
      );

      if (existingHistory) {
        // Se o histórico já existe, add a nova entrada
        existingHistory.consultas.push({
          mensagemUsuario: message.body,
          respostaBot: text,
        });
      } else {
        //Cria novo historico
        banco.db.push({
          numeroTelefone: message.from,
          consultas: [
            {
              mensagemUsuario: message.body,
              respostaBot: text,
            },
          ],
        });
      }

      // Rrespota ao cliente
      await client.sendText(message.from, text);
    } catch (error) {
      console.error("Erro ao processar a mensagem:", error);
      await client.sendText(
        message.from,
        "Desculpe, houve um erro ao processar sua solicitação."
      );
    }
  });
};

venom
  .create({
    session: "gemini_BOT",
    multidevice: true,
    headless: true,
    browserArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  })
  .then((client) => start(client))
  .catch((err) => console.log("Erro ao iniciar o Venom:", err));
