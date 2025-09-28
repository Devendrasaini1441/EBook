const app = require('./app');
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // allow public access

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
