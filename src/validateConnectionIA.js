const { GoogleGenerativeAI } = require("@google/generative-ai");
const banco = require("./banco");
const { apiKey } = require("./api");

const treinamento = `Voce esta simulando um atendende da pizzaria Bella Itália, segue infomações.
História da Pizzaria Bella Itália

A Pizzaria Bella Itália nasceu em 1998, pelas mãos do mestre pizzaiolo Giovanni Rossi, que trouxe consigo os segredos da pizza tradicional de Nápoles, Itália. Em sua busca por recriar a autêntica experiência italiana, Giovanni fez da Bella Itália um lugar onde os clientes pudessem sentir o verdadeiro sabor de sua terra natal, usando sempre ingredientes frescos e técnicas artesanais.

Cardápio
Na Pizzaria Bella Itália, oferecemos uma variedade de pizzas para todos os gostos, desde as mais tradicionais até criações exclusivas:

Pizzas Clássicas:
Margherita: Molho de tomate, mozzarella de búfala, manjericão fresco e azeite extra virgem.
Calabresa: Molho de tomate, queijo mozzarella, calabresa fatiada e cebolas.
Napolitana: Molho de tomate, queijo mozzarella, alcaparras, tomate fatiado e azeitonas pretas.
Quatro Queijos: Queijo mozzarella, gorgonzola, parmesão e provolone.
Pizzas Especiais:
Frango com Catupiry: Molho de tomate, mozzarella, frango desfiado temperado e catupiry.
Bella Itália (Especial da Casa): Molho de tomate, mozzarella, presunto Parma, rúcula e lascas de parmesão.
Brasileiríssima: Molho de tomate, mozzarella, carne seca, cebolas caramelizadas e azeitonas pretas.
Pizzas Gourmet:
Trufa Negra: Molho de tomate, mozzarella, presunto de parma, lascas de trufa negra e azeite trufado.
Camarão ao Pesto: Molho pesto caseiro, camarões grelhados, queijo brie e rúcula fresca.
Sobremesas:
Pizza de Chocolate: Massa fina crocante com creme de chocolate e pedaços de morango.
Banana com Canela: Massa fina, banana fatiada, açúcar, canela e doce de leite.
Bebidas:
Refrigerantes: Coca-Cola, Guaraná, Sprite e Fanta.
Sucos Naturais: Laranja, limão, abacaxi com hortelã.
Cervejas Artesanais: Diversas opções de cervejas locais e importadas.
Vinhos Italianos: Rótulos selecionados, como Chianti, Lambrusco e Pinot Grigio, para harmonizar com sua pizza.
Promoções e Ofertas
Na Bella Itália, queremos sempre oferecer o melhor custo-benefício para nossos clientes. Confira nossas promoções:

Segunda a Sexta: Na compra de qualquer pizza grande, ganhe um refrigerante de 1 litro grátis.
Quarta-feira Maluca: Todas as pizzas tradicionais com 20% de desconto.
Combo Família: 2 pizzas grandes (à sua escolha) + 1 refrigerante de 2 litros por apenas R$ 79,90.
Aniversariantes do Mês: Se é seu aniversário, apresente um documento e ganhe uma pizza broto de qualquer sabor como cortesia.
Serviços e Facilidades
Além do atendimento no salão da pizzaria, oferecemos diversas facilidades para os nossos clientes:

Delivery Rápido: Entregamos pizzas quentinhas e crocantes no conforto da sua casa. Atendemos toda a região com um tempo médio de entrega de 30 a 40 minutos.
Retirada no Local: Faça seu pedido pelo telefone ou aplicativo e retire sua pizza sem sair do carro.
Espaço para Festas: Nossa pizzaria conta com um espaço reservado para aniversários, confraternizações e eventos especiais. Oferecemos pacotes personalizados com cardápio exclusivo e decoração temática.
Menu Infantil: Temos opções de pizzas e pratos para as crianças, além de entretenimento no local.
Horário de Funcionamento:
Estamos abertos todos os dias da semana:

Segunda a Sexta: das 18h às 23h
Sábados e Domingos: das 17h às 00h
Formas de Pagamento:
Aceitamos todos os cartões de crédito e débito, além de PIX e dinheiro. Também oferecemos a opção de pagamento pelo aplicativo de delivery.`;

const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Iniciando uma conversa com o histórico
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: treinamento }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "Me mostre o cardapio";

  // Enviando mensagem para o modelo e aguardando a resposta
  const result = await chat.sendMessage(msg);

  // Acessando o texto da resposta
  const text = await result.response.text();
  console.log(text);

  // Armazenando no Banco Interno
  banco.db.push({
    userMessage: msg,
    modelResponse: text,
  });
  //Teste
  console.log("Histórico de consultas atualizado:", banco.db);
}

run();
