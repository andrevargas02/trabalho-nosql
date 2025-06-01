const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Clothing = require('../models/Clothing');

dotenv.config();

const sampleData = [
  {
    name: 'T-Shirt Basic',
    category: 'Tops',
    size: 'M',
    color: 'Branco',
    price: 12.99,
    stock: 50,
    imageUrl: 'http://localhost:5000/fotos/tshirtBranca.png'
  },
  {
    name: 'Hoodie Oversized',
    category: 'Tops',
    size: 'L',
    color: 'Preto',
    price: 29.99,
    stock: 30,
    imageUrl: 'http://localhost:5000/fotos/hoodiePreto.png'
  },
  {
    name: 'Jeans Slim Fit',
    category: 'Bottoms',
    size: '32',
    color: 'Azul-escuro',
    price: 39.90,
    stock: 40,
    imageUrl: 'http://localhost:5000/fotos/jeansAzul.png'
  },
  {
    name: 'Casaco Bomber',
    category: 'Outwear',
    size: 'M',
    color: 'Verde-militar',
    price: 59.90,
    stock: 20,
    imageUrl: 'http://localhost:5000/fotos/bomberJacket.png'
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Clothing.deleteMany({});
    await Clothing.insertMany(sampleData);
    console.log('✅ Base de dados populada com sucesso!');
    process.exit();
  } catch (err) {
    console.error('❌ Erro no seed:', err);
    process.exit(1);
  }
})();
