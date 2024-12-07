const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Maneja todas las rutas hacia index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Define el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
