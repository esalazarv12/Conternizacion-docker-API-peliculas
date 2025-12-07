require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`API lista en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });
