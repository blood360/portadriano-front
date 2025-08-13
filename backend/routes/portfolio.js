const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const PortfolioItem = require('../models/PortfolioItem');
const multer = require('multer');

// Configuração do Multer para processar o arquivo em memória, sem salvar em disco
const storage = multer.memoryStorage();
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

// @route   GET /api/portfolio/:id
// @desc    Obter um item do portfólio por ID
// @access  Público
router.get('/:id', async (req, res) => {
  try {
    const item = await PortfolioItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item não encontrado' });
    }
    res.json(item);
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
    let imageData = null;
    let mimeType = null;
    
    if (req.file) {
      imageData = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype;
    }
    
    const { title, description, type, repositoryLink, projectLink, issuer, startDate, endDate, hours, courseType, status, expectedEndDate } = req.body;
    
    const newItem = await PortfolioItem.create({
      title,
      description,
      type,
      imageData,
      mimeType,
      repositoryLink,
      projectLink,
      issuer,
      startDate,
      endDate,
      hours,
      courseType,
      status,
      expectedEndDate
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
