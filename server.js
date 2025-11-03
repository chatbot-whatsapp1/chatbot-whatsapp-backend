const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Token de verificação (use o mesmo configurado no ChatFlow e na Meta)
const VERIFY_TOKEN = "mysecretkey123";

app.use(bodyParser.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('✅ Servidor WhatsApp Backend rodando com sucesso!');
});

// Webhook de verificação (para Meta)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verificado com sucesso!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook de mensagens recebidas
app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log('📩 Mensagem recebida:', JSON.stringify(body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
