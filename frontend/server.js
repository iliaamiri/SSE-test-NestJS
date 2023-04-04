const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
