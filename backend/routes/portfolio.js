const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const PortfolioItem = require('../models/PortfolioItem');
const multer = require('multer');
const path = require('path');

// Configuração do Multer para armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta 'uploads' na raiz do projeto
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// @route   GET /api/portfolio
// @desc    Obter todos os itens do portfólio
// @access  Público
router.get('/', async (req, res) => {
  try {
    const items = await PortfolioItem.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// @route   POST /api/portfolio
// @desc    Adicionar um novo item com upload de imagem
// @access  Privado
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // Obtenha a URL da imagem se um arquivo foi enviado
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    // Obtenha os outros dados do corpo da requisição
    const { title, description, type, repositoryLink, projectLink, issuer, date } = req.body;
    
    const newItem = await PortfolioItem.create({
      title,
      description,
      type,
      imageUrl,
      repositoryLink,
      projectLink,
      issuer,
      date,
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Deletar um item do portfólio
// @access  Privado
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await PortfolioItem.destroy({
      where: { id: req.params.id }
    });
    if (result === 0) {
      return res.status(404).json({ msg: 'Item não encontrado' });
    }
    res.json({ msg: 'Item removido com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;
