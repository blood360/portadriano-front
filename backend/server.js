const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const path = require('path');

// Importar as rotas
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexão e sincronização com o banco de dados
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com PostgreSQL estabelecida com sucesso.');
    
    // A opção { alter: true } atualiza as tabelas
    await sequelize.sync({ alter: true }); 
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do portfólio está rodando!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor rodando na porta ${PORT}`);
});
